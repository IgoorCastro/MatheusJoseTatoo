import { NextApiRequest, NextApiResponse } from "next";
import { SignJWT } from 'jose';

const SECRET_KEY = process.env.SECRET_KEY as string;

const handlerAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return res.status(405).json({ message: "Método não permitido" });

    try {
        const { usuario, senha } = req.body; 
        if (usuario === process.env.ADMIN_USER && senha === process.env.ADMIN_PASSWORD){
            const token = await new SignJWT({ usuario })  // Define o payload
                .setProtectedHeader({ alg: 'HS256' })     // Define o algoritmo de assinatura
                .setExpirationTime('7d')                   // Define a expiração do token
                .sign(new TextEncoder().encode(SECRET_KEY));  // Assina com a chave secreta   
            return res.status(200).json({ token });
        }

        return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    } catch (Err) { console.log('Erro no autenticador', Err) };
}

export default handlerAuth;