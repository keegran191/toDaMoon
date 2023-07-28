import pool from "../../../../lib/database";

export default async function handler(req, res) {

  const { cid } = req.query;

  const [results] = await pool.query('SELECT * FROM stock WHERE CategoryId = ? ',[cid]).catch((err) => {
    pool.end();
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
  });
  if (results.length > 0) {
    console.log('using')
    pool.end();
    res.redirect(307, "/adminpage/category?errorMsg=CaregoryIdIsUsing=");

  } else {
    const [resultsSubCategory] = await pool.query('DELETE FROM subcategory WHERE category_id = ?',[cid]).catch((err) => {
      pool.end();
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
    });
  
    const [resultsCategory] = await pool.query('DELETE FROM category WHERE cat_id = ?',[cid]).catch((err) => {
      pool.end();
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
    });
    console.log("Delete success")
    pool.end();
    res.redirect(307, "/adminpage/category");
  }
}