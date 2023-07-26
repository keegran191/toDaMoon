import pool from "../../../lib/database";

export default async function handler(req, res) {
  const id = req.query.id;
  const label = req.query.label;

  const [results] = await pool.query('UPDATE subcategory SET sub_label = ? WHERE sub_id = ?',[label, id]).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });
 //pool.end();
  res.redirect(307, '/adminpage/subcategory')
}
