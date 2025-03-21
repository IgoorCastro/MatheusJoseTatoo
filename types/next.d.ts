// types/next.d.ts
// import { NextApiRequest } from 'next';
import { File } from 'multer';

declare module 'next' {
  export interface NextApiRequest {
    file?: File;  // Agora o NextApiRequest tem a propriedade 'file'
  }
}
