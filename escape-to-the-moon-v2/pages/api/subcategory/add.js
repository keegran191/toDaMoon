import db from "../../../lib/database";

export default async function handler(req, res) {

  const cid = req.query.cid;
  const label = req.query.label;
  const pool = await db.getConnection();
  
  const [results] = await pool.query('INSERT INTO subcategory (sub_label, category_id) VALUES (?,?)',[label, cid]).catch((err) => {
    pool.destroy();
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });
  pool.destroy();
  res.redirect(307, '/adminpage/subcategory')
}
