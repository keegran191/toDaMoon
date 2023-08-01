import db from "../../../lib/database";

export default async function handler(req, res) {
    const pool = await db.getConnection();
    
    const sql = `
        SELECT * 
        FROM order_list 
        INNER JOIN order_status 
            ON order_list.order_status = order_status.id
        INNER JOIN address 
            ON order_list.addressId = address.id
        WHERE 
            order_list.order_status != 0 
            AND order_list.order_status != 3 
            AND order_list.payment_status = "00"

        ORDER BY order_list.order_Id DESC
    `

    const [results] = await pool.query(sql).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    
    pool.destroy();
    res.status(200).json(results);
}