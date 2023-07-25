import pool from "../../../lib/database";

export default async function handler(req, res) {
    const refNumber = req.query.refNo

    const[results] = await pool.query('SELECT payment_status FROM order_list WHERE refNumber = ?', [refNumber]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    if (results[0].payment_status === "00") {
        return res.status(200).json({ isSuccenss: true });
    } else {
        return res.status(200).json({ isSuccenss: false });
    }
    
}