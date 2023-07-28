import pool from "../../../../lib/database";

export default async function handler(req, res) {

  const { id } = req.query;
  const [results] = await pool.query('DELETE FROM basket WHERE id = ?', [id]).catch((err) => {
    pool.end();
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });
  pool.end();
  res.status(200).json(results);
}
