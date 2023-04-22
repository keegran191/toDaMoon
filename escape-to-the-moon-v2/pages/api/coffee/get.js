import pool from "../../../lib/database";

export default async function handler(req, res) {

  const [results] = await pool.query('SELECT * FROM coffee', []).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });

  res.status(200).json(results);
}