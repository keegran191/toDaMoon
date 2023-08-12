import db from "../../../lib/database";

export default async function handler(req, res) {
    const pool = await db.getConnection();

    const id = req.query.id;
    const order_status = req.query.order_status;

    let sql = `
        SELECT * 
        FROM order_list 
        INNER JOIN order_status 
            ON order_list.order_status = order_status.id
        INNER JOIN address 
            ON order_list.addressId = address.id
        WHERE 
            order_list.UserId = ?
            AND order_list.payment_status = "00"
    `;

    const values = [id];

    if (order_status !== "0") {
        sql += `AND order_list.order_status = ? `;
        values.push(order_status);
    }
    
    sql += `ORDER BY order_list.order_Id DESC`;

    try {
        const [results] = await pool.query(sql, values);
        pool.destroy();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
    }
}
