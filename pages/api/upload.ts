import { NextApiRequest, NextApiResponse } from 'next';
import multer, { MulterError } from 'multer';
import path from 'path';
import fs from 'fs';
import pool from '../../lib/db';
import { promisify } from 'util';
import { Request, Response } from 'express';

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

        // Pegando o caminho dos arquivos enviados
        const filePaths = images.map(file => path.join('public', 'uploads', file.filename));
        const coverPath = coverFile ? path.join('public', 'uploads', coverFile.filename) : null;

        console.log(`- Request\nTitle ${title}\nDescrição: ${desc}\n Files: ${filePaths}`);

        // Inserindo no banco de dados
        const SQL = `INSERT INTO collection (capa, titulo, descricao) VALUES ($1, $2, $3) RETURNING *`;
        const values = [coverPath, title, desc];

        const result = await pool.query(SQL, values);

        const collectionId = result.rows[0].id; // Pegando o ID gerado

        // Inserindo imagens associadas à coleção
        if (filePaths) {
            const insertPromises = filePaths.map(async (item) => {
                const SQL2 = `INSERT INTO collect_image (collect_id, image) VALUES ($1, $2) RETURNING *`;
                const values2 = [collectionId, item]; // Corrigido para inserir collectionId corretamente
                return pool.query(SQL2, values2);
            });

            const result2 = await Promise.all(insertPromises);

            res.status(200).json({
                message: 'Upload bem-sucedido',
                files: filePaths,
                data: result.rows[0],
                data2: result2[0],
            });
        } else {
            res.status(200).json({
                message: 'Upload bem-sucedido',
                files: filePaths,
                data: result.rows[0],
            });
        }
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
