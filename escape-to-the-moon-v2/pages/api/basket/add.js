import pool from "../../../lib/database";

export default async function handler(req, res) {

    const stockId = req.query.stockId
    const stockAmount = req.query.stockAmount
    const stockPrice = req.query.stockPrice
    const userId = req.query.userId

    const [results] = await pool.query('INSERT INTO basket (stockId, stockAmount, stockPrice, userId) VALUES (?,?,?,?)', [stockId, stockAmount, stockPrice, userId]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    })

    res.redirect(307,'/store')
}