import fs from 'fs';
import path from 'path';
import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/testApi';
import { NextApiRequest } from 'next';
import { File as MulterFile } from 'multer';

describe('UPLOAD API TEST', () => {
  it('should upload a file successfully', async () => {
    // Criar mock de request e response
    const { req, res } = createMocks({
      method: 'POST',
    });

    // Caminho do arquivo de teste
    const filePath = path.resolve(process.cwd(), '__tests__/test-image.jpg');
    const fileBuffer = fs.readFileSync(filePath);

    // Definir a tipagem correta para req
    const nextReq = req as unknown as NextApiRequest & { file: MulterFile };

    // Simular a requisição do arquivo
    nextReq.file = {
      fieldname: 'image',
      originalname: 'test-image.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: fileBuffer,
      size: fileBuffer.length,
      stream: fs.createReadStream(filePath),
    };

    // Chamar o handler da API simulando a requisição
    await handler(nextReq, res);

    // Verificar a resposta
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).message).toBe('Arquivo carregado com sucesso');
  });
});
