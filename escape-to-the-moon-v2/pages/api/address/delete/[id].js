import db from "../../../../lib/database";

export default async function handler(req, res) {

    const { id } = req.query;
    const pool = await db.getConnection();
  
    const [results] = await pool.query('DELETE FROM address WHERE Id = ?',[id]).catch((err) => {
      pool.destroy();
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
    });
  
    console.log("Delete success")
    pool.destroy();
    res.redirect(307, "/usermanagement");
  }