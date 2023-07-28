import pool from "../../../../lib/database";

export default async function handler(req, res) {

    const { id } = req.query;

  
    const [resultsStock] = await pool.query('DELETE FROM stock WHERE Id = ?',[id]).catch((err) => {
      pool.end();
      res.status(500).json({ "Status": "Database Error" });
      console.error(err);
    });
    console.log("Delete success")
    pool.end();
    res.redirect(307, "/adminpage/stock");
  }