import db from "../../../lib/database";

export default async function handler(req, res) {
  
  const startIndex = parseInt(req.query.startIndex, 10) || 0;
  const offset = parseInt(req.query.offset, 10) || 10;
  const pool = await db.getConnection();

  
  try {
    const query = 'SELECT * FROM stock WHERE IsAdvise = 1 AND deleteflag = 0 ORDER BY stock.Id DESC LIMIT ? OFFSET ?';
    const [results] = await pool.query(query, [offset, startIndex]);
    pool.destroy();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    pool.destroy();
    res.status(500).json({ "Status": "Database Error" });
  }
}
