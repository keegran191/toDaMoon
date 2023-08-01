import db from "../../../lib/database";

export default async function handler(req, res) {
  
    const newCategory = req.body.AddCategory
    const pool = await db.getConnection();
    
    const [results] = await pool.query('INSERT INTO `category`(`cat_label`) VALUES(?)',[newCategory]).catch((err) => {
      pool.destroy();
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
      return null;
    });
    pool.destroy();
    res.redirect(307, '/adminpage/category')
    res.status(200)
}