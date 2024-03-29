import db from "../../../lib/database";

export default async function handler(req, res) {
    const pool = await db.getConnection();

    const orderId = req.query.orderId

    const [results] = await pool.query('UPDATE order_list SET isRead = 1 WHERE order_Id = ?',[orderId]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    
    pool.destroy();
    res.status(200).json({"Status": "UpdateComplete"});
}