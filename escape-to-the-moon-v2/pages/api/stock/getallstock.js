import pool from "../../../lib/database";

export default async function handler(req, res) {
  const [results] = await pool.query('SELECT * FROM stock',[]).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
  });

  res.status(200).json(results);
}