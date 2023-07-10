import pool from "../../../lib/database";

export default async function handler(req, res) {

  const id = req.query.id;
  const label = req.query.label;

  const [results] = await pool.query('UPDATE category SET cat_label = ? WHERE cat_id = ?',[label, id]).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });

  console.log("update category success")
  res.status(201).json({"Status": "Category Updated"});
}
