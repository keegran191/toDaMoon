import pool from "../../../lib/database";

export default async function handler(req, res) {
    const[results] = await pool.query('UPDATE order_list SET payment_status = ? WHERE refNumber = ?', [req.body.resultCode, req.body.referenceNo]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });

    return res.status(200).json({ isSuccenss: true, messge: "Payment Completed" });
}