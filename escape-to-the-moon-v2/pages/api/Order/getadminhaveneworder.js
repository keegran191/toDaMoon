import db from "../../../lib/database";

export default async function handler(req, res) {
    const pool = await db.getConnection();
    
    const [results] = await pool.query(`
        SELECT COUNT(order_list.order_Id) AS IsOrderRead
        FROM order_list 
        INNER JOIN order_status 
            ON order_list.order_status = order_status.id
        WHERE 
            order_list.isRead = 0
            AND order_list.order_status != 0 
            AND order_list.order_status != 3 
            AND order_list.payment_status = "00"

        ORDER BY order_list.order_Id DESC`

    ).catch((err) => {
        pool.destroy();
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    
    if (results.length > 0) {
        pool.destroy();
        res.status(200).json({ IsRead: 0 })
    } else {
        pool.destroy();
        res.status(200).json({ IsRead: 1 })
    }
}