import pool from "../../../../lib/database";

export default async function handler(req, res) {
    const {userid} = req.query;

    const [results] = await pool.query('SELECT * FROM address WHERE userId = ?', [userid]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
    })

    res.status(200).json(results);
}