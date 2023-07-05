import pool from "../../../lib/database";

export default async function handler(req, res) {
  const searchItem = 'test';

  try {
    const [results] = await pool.query('SELECT * FROM stock WHERE Title LIKE ?', [`%${searchItem}%`]);
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ "Status": "Database Error" });
  }
}
