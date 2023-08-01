import db from "../../../lib/database";

export default async function handler(req, res) {
    const pool = await db.getConnection();
    
    const refNumber = Date.now();
    const addressId = req.query.addressId
    const UserId = req.query.UserId

    const [results] = await pool.query('INSERT INTO order_list (refNumber, addressId, UserId) VALUES (?,?,?)',[refNumber,addressId,UserId]).catch((err) => {
        pool.destroy();
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    pool.destroy();
    return res.status(200).json({ success: true, reffNo: refNumber });
}