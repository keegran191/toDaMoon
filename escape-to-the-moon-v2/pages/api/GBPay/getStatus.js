import pool from "../../../lib/database";

export default async function handler(req, res) {
    const refNumber = req.query.refNo

    const[results] = await pool.query('SELECT payment_status FROM order_list WHERE refNumber = ?', [refNumber]).catch((err) => {
        pool.end();
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    if (results[0].payment_status === "00") {
        pool.end();
        return res.status(200).json({ isSuccenss: true });
    } else {
        pool.end();
        return res.status(200).json({ isSuccenss: false });
    }
    
}