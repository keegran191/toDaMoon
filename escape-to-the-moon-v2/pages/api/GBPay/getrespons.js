import pool from "../../../lib/database";

export default async function handler(req, res) {

    const [results] = await pool.query('UPDATE order_list SET payment_status = ? ,IsUpdateStock = 1 WHERE refNumber = ?', [req.body.resultCode, req.body.referenceNo]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });
    
    const resultRows = await pool.query('SELECT UserId, order_Id FROM order_list WHERE refNumber = ?', [req.body.referenceNo]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return [];
      });
      
    const resultsStock = await pool.query('SELECT stockId, stockAmount, stockPrice FROM basket WHERE userId = ?', [resultRows.UserId]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return [];
      });
      
      // Combine order_Id with each row of resultsStock
    const combinedResults = resultsStock.map(stockItem => {
        return { ...stockItem, order_Id: resultRows.order_Id };
      });
      
      // Insert each row of combinedResults into the item_order table
    combinedResults.forEach(async item => {
        const { order_Id, stockId, stockAmount, stockPrice } = item;
        const total = stockAmount * stockPrice;
      
        const insertQuery = 'INSERT INTO item_order (order_id, stock_id, price, amount, total) VALUES (?, ?, ?, ?, ?)';
        await pool.query(insertQuery, [order_Id, stockId, stockPrice, stockAmount, total]).catch((err) => {
            res.status(500).json({ "Status": "Database Error" });
            console.error(err);
            return [];
        });
    });
      
    // Clear items in the basket 
    const ClearBasket = await pool.query('DELETE FROM basket WHERE userId = ?', [resultRows.UserId]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return [];
    });

    return res.status(200).json({ isSuccenss: true, messge: "Payment Completed" });
}