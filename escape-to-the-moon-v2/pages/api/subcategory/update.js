import db from "../../../lib/database";

export default async function handler(req, res) {
  const id = req.query.id;
  const label = req.query.label;
  const pool = await db.getConnection();
  
  const [results] = await pool.query('UPDATE subcategory SET sub_label = ? WHERE sub_id = ?',[label, id]).catch((err) => {
    console.error(err);
    pool.destroy();
    res.status(500).json({ "Status": "Database Error" });

    return null;
  });
  pool.destroy();
  res.redirect(307, '/adminpage/subcategory')
}
