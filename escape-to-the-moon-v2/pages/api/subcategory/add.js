import pool from "../../../lib/database";

export default async function handler(req, res) {

  const cid = req.query.cid;
  const label = req.query.label;

  const [results] = await pool.query('INSERT INTO subcategory (sub_label, category_id) VALUES (?,?)',[label, cid]).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });

  res.redirect(307, '/adminpage/subcategory')
}
