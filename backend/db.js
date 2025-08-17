import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env if available
dotenv.config();

// Create a connection pool.  Using a pool improves performance and
// allows multiple simultaneous queries without repeatedly opening
// connections.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rank_the_world',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Execute a parameterised SQL query using the connection pool.
 *
 * @param {string} sql The SQL query with placeholders
 * @param {Array<any>} params An array of values to substitute into the placeholders
 * @returns {Promise<import('mysql2/promise').RowDataPacket[]>} Result rows
 */
export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
