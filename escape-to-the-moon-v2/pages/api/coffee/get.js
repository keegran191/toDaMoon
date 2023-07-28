import db from "../../../lib/database";

export default async function handler(req, res) {
  const pool = await db.getConnection();

  const [results] = await pool.query('SELECT * FROM coffee').catch((err) => {
    pool.end();
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });
  
  pool.end();
  res.status(200).json(results);
}