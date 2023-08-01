import db from "../../../lib/database";

export default async function handler(req, res) {

  const pool = await db.getConnection();
  
  const [results] = await pool.query('SELECT * FROM category WHERE cat_id != 40 AND cat_id != 41 AND cat_id != 42', []).catch((err) => {
    pool.destroy();
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });
  pool.destroy();
  res.status(200).json(results);
}
