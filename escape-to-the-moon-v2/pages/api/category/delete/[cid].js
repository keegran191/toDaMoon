import pool from "../../../../lib/database";

export default async function handler(req, res) {

  const { cid } = req.query;

  const [resultsSubCategory] = await pool.query('DELETE FROM subcategory WHERE category_id = ?',[cid]).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });

  const [resultsCategory] = await pool.query('DELETE FROM category WHERE cat_id = ?',[cid]).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });

  console.log("Delete success")
  res.status(201).json({"Status": "Sub Category Deleted"});
}

