// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', // Usuário do seu banco de dados
  host: 'localhost', // Host do seu banco de dados
  database: 'matheusTatoo_v1', // Nome do banco de dados
  password: '973164', // Senha do usuário
  port: 5432, // Porta padrão do PostgreSQL
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Conexão bem-sucedida ao PostgreSQL!');
    client.release();  // Libera o cliente após a verificação
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err);
  }
};

testConnection();

export default pool;
