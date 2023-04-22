import pool from "../../../lib/database";

export default async function handler(req, res) {
    const newCategory = req.body.AddCategory
    const [results] = await pool.query('INSERT INTO `category`(`cat_label`) VALUES(?)',[newCategory]).catch((err) => {
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
      return null;
    });

    res.redirect(307, '/adminpage')
    res.status(200)
}