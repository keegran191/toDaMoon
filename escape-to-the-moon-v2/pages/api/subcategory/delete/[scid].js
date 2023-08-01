import db from "../../../../lib/database";

export default async function handler(req, res) {

  const { scid } = req.query;
  const pool = await db.getConnection();
  
  const [results] = await pool.query('SELECT * FROM stock WHERE SubCategoryId = ? ',[scid]).catch((err) => {
    pool.destroy();
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
  });

  if (results.length > 0) {
    console.log('using')
    pool.destroy();
    res.redirect(307, "/adminpage/subcategory?errorMsg=SubCaregoryIdIsUsing=");

  } else {
    const [resultsSubCategory] = await pool.query('DELETE FROM subcategory WHERE sub_id = ?',[scid]).catch((err) => {
      pool.destroy();
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
    });
  
    console.log("Delete success")
    pool.destroy();
    res.redirect(307, "/adminpage/subcategory");
  }
  
}