import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  try {
    const con = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'to_da_moon'
    });

    const [results,] = await con.execute('SELECT * FROM category');

    res.status(200).json(results);
    con.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database Error' });
    con.end();
  }
}