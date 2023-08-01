import db from "../../../lib/database";

export default async function handler(req, res) {

    const pool = await db.getConnection();

    let today = new Date();

    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();

    let hours = String(today.getHours()).padStart(2, '0');
    let minutes = String(today.getMinutes()).padStart(2, '0');
    let seconds = String(today.getSeconds()).padStart(2, '0');

    let date = day + "/" + month + "/" + year
    let time = hours + ":" + minutes + ":" + seconds

    const [results] = await pool.query('UPDATE order_list SET payment_status = ? ,IsUpdateStock = 1,  order_status = 4,  order_on = ? WHERE refNumber = ?', [req.body.resultCode, (date + " " + time),req.body.referenceNo]).catch((err) => {
        pool.destroy();
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    
    const [resultRows] = await pool
        .query("SELECT UserId, order_Id FROM order_list WHERE refNumber = ?", [
            req.body.referenceNo,
        ])
        .catch((err) => {
            pool.destroy();
            res.status(500).json({ Status: "Database Error" });
            console.error(err);
            return null;
        });

    if (resultRows.length === 0) {
        pool.destroy();
        res.status(404).json({ Status: "Order not found" });
        return null;
    }
    
    const userId = resultRows[0].UserId;
    const orderId = resultRows[0].order_Id;

    const [resultsStock] = await pool
        .query("SELECT stockId, stockAmount, stockPrice FROM basket WHERE userId = ?", [
        userId,
        ])
        .catch((err) => {
            pool.destroy();
            res.status(500).json({ Status: "Database Error" });
            console.error(err);
            return null;
        });

    // Insert each row of resultsStock into the item_order table
    for (const stockItem of resultsStock) {
        const { stockId, stockAmount, stockPrice } = stockItem;
        const total = stockAmount * stockPrice;

        const insertQuery =
        "INSERT INTO item_order (order_id, stock_id, price, amount, total) VALUES (?, ?, ?, ?, ?)";
        await pool
        .query(insertQuery, [orderId, stockId, stockPrice, stockAmount, total])
        .catch((err) => {
            pool.destroy();
            res.status(500).json({ Status: "Database Error" });
            console.error(err);
            return [];
        });

         // Update the stock table
        const updateStockQuery = "UPDATE stock SET Amount = Amount - ? WHERE Id = ?";
        await pool
        .query(updateStockQuery, [stockAmount, stockId])
        .catch((err) => {
            pool.destroy();
            console.error(err);
            return res.status(500).json({ Status: "Database Error" });
        });
    }



    // Clear items in the basket
    const [ClearBasket] = await pool.query("DELETE FROM basket WHERE userId = ?", [userId]).catch((err) => {
            pool.destroy();
            res.status(500).json({ Status: "Database Error" });
            console.error(err);
            return [];
        });

    pool.destroy();   
    return res.status(200).json({ isSuccess: true, message: "Payment Completed" });
}
