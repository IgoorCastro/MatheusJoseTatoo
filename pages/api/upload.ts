import { NextApiRequest, NextApiResponse } from 'next';
import multer, { MulterError } from 'multer';
import path from 'path';
import fs from 'fs';
import pool from '../../lib/db';
import { promisify } from 'util';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp'; // Importando o sharp para conversão

// Criamos um tipo que estende NextApiRequest e inclui `files`
interface MulterNextApiRequest extends NextApiRequest {
    files?: Express.Multer.File[];
}

// Configuração do armazenamento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

// Criando o middleware de upload com multer
const upload = multer({ storage }).fields([
    { name: 'cover', maxCount: 1 },
    { name: 'image', maxCount: 10 }, // Ajuste o máximo conforme necessário
]);

// Transformando o middleware em uma Promise para evitar `any`
const uploadMiddleware = promisify(
    (req: NextApiRequest, res: NextApiResponse, callback: (err?: string) => void) => {
        upload(req as unknown as Request, res as unknown as Response, callback);
    }
);

// Desativar o bodyParser do Next.js
export const config = {
    api: {
        bodyParser: false,
    },
};

// Função para converter HEIC para JPEG
const convertHeicToJpeg = async (filePath: string, outputPath: string) => {
    try {
        await sharp(filePath)
            .toFormat('jpeg') // Converte para JPEG
            .toFile(outputPath);
    } catch (error) {
        throw new Error(`Erro ao converter o arquivo HEIC`);
    }
};

// Handler principal
const handler = async (req: MulterNextApiRequest, res: NextApiResponse) => {
    console.log('~~Upload\nReq: ', req.body);
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    try {
        // Executa o middleware sem erro de tipagem
        console.log('~~Iniciando upload\n\n');
        await uploadMiddleware(req, res);

        const files = (req.files ?? {}) as { [fieldname: string]: Express.Multer.File[] };

        if (!files || (!files['image'] && !files['cover'])) {
            return res.status(400).json({ message: 'Nenhum arquivo enviado' });
        }

        // Se existir a chave 'image', pegamos os arquivos. Caso contrário, um array vazio
        const images = Array.isArray(files['image']) ? files['image'] : [];

        // Se existir a chave 'cover', pegamos a primeira imagem (única capa)
        const coverFile = Array.isArray(files['cover']) ? files['cover'][0] : null;

        // Dados adicionais do body
        const { title, desc } = req.body;

        // Função para salvar e converter os arquivos (capa e imagens)
        const processFiles = async (file: Express.Multer.File) => {
            const extname = path.extname(file.originalname).toLowerCase();
            const originalPath = path.join('public', 'uploads', file.filename);
            let outputPath = originalPath;

            // Se o arquivo for HEIC, converta para JPEG
            if (extname === '.heic') {
                outputPath = originalPath.replace('.heic', '.jpg');
                await convertHeicToJpeg(originalPath, outputPath); // Converte HEIC para JPEG
                fs.unlinkSync(originalPath); // Remove o arquivo HEIC original
            }

            return outputPath;
        };

        // Processando imagens
        const processedImages = await Promise.all(images.map(processFiles));

        // Processando a capa
        const processedCover = coverFile ? await processFiles(coverFile) : null;

        // Dados para inserção no banco de dados
        const filePaths = processedImages; // Arquivos de imagem processados
        const coverPath = processedCover; // Caminho da capa processada
        const date = new Date();
        const newUUID = uuidv4();

        console.log(`- Request\nTitle: ${title}\nDescrição: ${desc}\nFiles: ${filePaths}`);

        // Inserindo no banco de dados
        const SQL = `INSERT INTO collection (capa, titulo, descricao, data, colecao, id_uuid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [coverPath, title, desc, date, filePaths, newUUID];

        const result = await pool.query(SQL, values);

        res.status(200).json({
            message: 'Upload bem-sucedido',
            files: filePaths,
            data: result.rows[0],
        });
    } catch (error) {
        if (error instanceof MulterError) {
            return res.status(400).json({ message: `Erro no upload: ${error.message}` });
        } else if (error instanceof Error) {
            return res.status(500).json({ message: `Erro no servidor: ${error.message}` });
        } else {
            return res.status(500).json({ message: 'Erro desconhecido' });
        }
    }
};

export default handler;
