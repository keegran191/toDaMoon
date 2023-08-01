import db from "../../../lib/database";

export default async function handler(req, res) {
    const refNumber = req.query.refNo
    const pool = await db.getConnection();
    
    const[results] = await pool.query('SELECT payment_status FROM order_list WHERE refNumber = ?', [refNumber]).catch((err) => {
        pool.destroy();
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    if (results[0].payment_status === "00") {
        pool.destroy();
        return res.status(200).json({ isSuccenss: true });
    } else {
        pool.destroy();
        return res.status(200).json({ isSuccenss: false });
    }
    
}