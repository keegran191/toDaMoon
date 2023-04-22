import pool from "../../../../lib/database";

export default async function handler(req, res) {

  const { cid } = req.query;
  const [results] = await pool.query('SELECT * FROM subcategory WHERE category_id = ?', [cid]).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });

  res.status(200).json(results);
}
