import db from "../../../lib/database";

export default async function handler(req, res) {
    const pool = await db.getConnection();
    const search = req.query.search

    let sql = `
        SELECT * 
        FROM order_list 
        LEFT JOIN order_status 
            ON order_list.order_status = order_status.id
        LEFT JOIN address 
            ON order_list.addressId = address.id
        WHERE 
            order_list.order_status = 2
            AND order_list.payment_status = "00"
    `;

    const values = [`%${search}%`];

    if (search !== "") {
        sql += `AND order_list.refNumber LIKE ? `;
        values.push(search);
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