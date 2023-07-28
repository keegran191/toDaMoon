import pool from "../../../lib/database";

export default async function handler(req, res) {  
  const searchItem = req.query.search

  try {
    const [results] = await pool.query('SELECT * FROM stock WHERE Title LIKE ?', [`%${searchItem}%`]);
    pool.end();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    pool.end();
    res.status(500).json({ "Status": "Database Error" });
  }
}