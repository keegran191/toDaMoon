import db from "../../../lib/database";


export default async function handler(req, res) {

  const id = req.query.id;
  const label = req.query.label;
  const pool = await db.getConnection();
  
  const [results] = await pool.query('UPDATE category SET cat_label = ? WHERE cat_id = ?',[label, id]).catch((err) => {
    pool.destroy();
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });
  console.log("update category success")
  pool.destroy();
  res.status(201).json({"Status": "Category Updated"});
}
