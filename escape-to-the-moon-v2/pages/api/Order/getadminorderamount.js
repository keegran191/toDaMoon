import db from "../../../lib/database";

export default async function handler(req, res) {
    const pool = await db.getConnection();
    
    const [results] = await pool.query(`
        SELECT COUNT(order_list.order_Id) AS OrderAmount
        FROM order_list 
        LEFT JOIN order_status 
            ON order_list.order_status = order_status.id
        WHERE 
            order_list.order_status != 0 
            AND order_list.order_status != 2
            AND order_list.payment_status = "00"

        ORDER BY order_list.order_Id DESC`

    ).catch((err) => {
        pool.destroy();
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    
    if (results && results.length > 0) {
        const totalOrderAmount = results[0].OrderAmount;
        pool.destroy();
        res.status(200).json({ totalOrderAmount })
    } else {
        pool.destroy();
        res.status(200).json({ totalOrderAmount: 0 })
    }
}