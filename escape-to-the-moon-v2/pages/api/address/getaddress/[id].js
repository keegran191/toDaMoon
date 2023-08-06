import db from "../../../../lib/database";

export default async function handler(req, res) {
    const {id} = req.query;
    const pool = await db.getConnection();
    
    const [results] = await pool.query('SELECT * FROM address WHERE id = ?', [id]).catch((err) => {
        pool.destroy();
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
    })
    
    pool.destroy();
    res.status(200).json(results);
}