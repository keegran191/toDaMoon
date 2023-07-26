import pool from "../../../../lib/database";

export default async function handler(req, res) {

    const { id } = req.query;

  
    const [results] = await pool.query('DELETE FROM address WHERE Id = ?',[id]).catch((err) => {
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
    });
  
    console.log("Delete success")
   //pool.end();
    res.redirect(307, "/usermanagement");
  }