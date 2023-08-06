import db from "../../../../lib/database";

export default async function handler(req, res) {

  const { cid } = req.query;
  const pool = await db.getConnection();
  
  if( cid != 0) {
    const [results] = await pool.query('SELECT * FROM subcategory WHERE category_id = ?', [cid]).catch((err) => {
      pool.destroy();
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
      return null;
    });
    pool.destroy();
    res.status(200).json(results);
  } else {
    const [results] = await pool.query('SELECT * FROM subcategory WHERE category_id != ?', [cid]).catch((err) => {
      pool.destroy();
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
      return null;
    });
    pool.destroy();
    res.status(200).json(results);
  }
}
