import pool from "../../../lib/database";

export default async function handler(req, res) {
  
  const startIndex = parseInt(req.query.startIndex, 10) || 0;
  const offset = parseInt(req.query.offset, 10) || 10;

  try {
    const query = 'SELECT * FROM stock WHERE IsAdvise = 1 LIMIT ? OFFSET ?';
    const [results] = await pool.query(query, [offset, startIndex]);
   //pool.end();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ "Status": "Database Error" });
  }
}
