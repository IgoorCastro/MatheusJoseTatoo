import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log("Recebendo requisição para buscar imagens...");
        const search_uuid = req.body;

        if(!search_uuid) return res.status(400).json({ message: `UUID não encontrado` }); 

        const SQL = `SELECT colecao, capa FROM public.collection WHERE id_uuid = ${search_uuid.replace(/"/g, "'")} ORDER BY data ASC`;
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
