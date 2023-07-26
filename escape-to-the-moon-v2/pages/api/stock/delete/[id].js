import pool from "../../../../lib/database";

export default async function handler(req, res) {

    const { id } = req.query;

  
    const [resultsStock] = await pool.query('DELETE FROM stock WHERE Id = ?',[id]).catch((err) => {
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
    });
   //pool.end();
    console.log("Delete success")
    res.redirect(307, "/adminpage/stock");
  }