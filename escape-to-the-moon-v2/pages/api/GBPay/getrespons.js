import pool from "../../../lib/database";

export default async function handler(req, res) {
    const [results] = await pool.query('UPDATE order_list SET payment_status = ? ,IsUpdateStock = 1 WHERE refNumber = ?', [req.body.resultCode, req.body.referenceNo]).catch((err) => {
        pool.end();
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    
    const [resultRows] = await pool
        .query("SELECT UserId, order_Id FROM order_list WHERE refNumber = ?", [
            req.body.referenceNo,
        ])
        .catch((err) => {
            pool.end();
            res.status(500).json({ Status: "Database Error" });
            console.error(err);
            return null;
        });

    if (resultRows.length === 0) {
        pool.end();
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
            pool.end();
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
            pool.end();
            res.status(500).json({ Status: "Database Error" });
            console.error(err);
            return [];
        });

         // Update the stock table
        const updateStockQuery = "UPDATE stock SET Amount = Amount - ? WHERE Id = ?";
        await pool
        .query(updateStockQuery, [stockAmount, stockId])
        .catch((err) => {
            pool.end();
            console.error(err);
            return res.status(500).json({ Status: "Database Error" });
        });
    }



    // Clear items in the basket
    const [ClearBasket] = await pool.query("DELETE FROM basket WHERE userId = ?", [userId]).catch((err) => {
            pool.end();
            res.status(500).json({ Status: "Database Error" });
            console.error(err);
            return [];
        });

    pool.end();   
    return res.status(200).json({ isSuccess: true, message: "Payment Completed" });
}
