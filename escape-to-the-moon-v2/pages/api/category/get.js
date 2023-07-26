import pool from "../../../lib/database";

export default async function handler(req, res) {

  const [results] = await pool.query('SELECT * FROM category', []).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });
 //pool.end();
  res.status(200).json(results);
}