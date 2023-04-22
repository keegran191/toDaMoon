import pool from "../../../../lib/database";

export default async function handler(req, res) {
  const { scid } = req.query;

  const [results] = await pool.query('DELETE FROM subcategory WHERE sub_id = ?',[scid]).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });

  console.log("Delete success")
  res.status(201).json({"Status": "Sub Category Deleted"});
}