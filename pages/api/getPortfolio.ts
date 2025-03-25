import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log("Recebendo requisição para buscar imagens...");

        const SQL = `SELECT * FROM public.collection ORDER BY data DESC`;
        console.log("Executando consulta SQL:", SQL);

        const response = await pool.query(SQL);
        console.log("Consulta executada com sucesso:", response.rows);

        return res.status(200).json({ message: "Imagens encontradas!", data: response.rows });
    } catch (erro) {
        console.error("Erro ao buscar imagens:", erro);
        return res.status(500).json({ message: `Erro no servidor: ${erro}` });
    }
};

export default handler;
