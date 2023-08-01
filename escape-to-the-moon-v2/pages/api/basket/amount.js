import db from "../../../lib/database";

export default async function handler(req, res) {
    const userId = req.query.userId;
    const pool = await db.getConnection();

    const [results] = await pool.query('SELECT SUM(StockAmount) AS totalStockAmount FROM basket WHERE userId = ?', [userId]).catch((err) => {
        pool.destroy();
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    });

    if (results && results.length > 0) {
        const totalStockAmount = results[0].totalStockAmount;
        pool.destroy();
        res.status(200).json({ totalStockAmount });
    } else {
        pool.destroy();
        res.status(200).json({ totalStockAmount: 0 });
    }
}
