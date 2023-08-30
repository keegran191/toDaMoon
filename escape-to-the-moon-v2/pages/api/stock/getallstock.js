import db from "../../../lib/database";

export default async function handler(req, res) {  
  const searchItem = req.query.search
  const pool = await db.getConnection();
  
  try {
    const [results] = await pool.query('SELECT * FROM stock WHERE Title LIKE ? AND deleteflag = 0', [`%${searchItem}%`]);
    pool.destroy();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    pool.destroy();
    res.status(500).json({ "Status": "Database Error" });
  }
}