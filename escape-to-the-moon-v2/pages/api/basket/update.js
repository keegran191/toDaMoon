import db from "../../../lib/database";

export default async function handler(req, res) {
  const pool = await db.getConnection();

  const stockId = req.query.stockId
  const stockAmount = req.query.stockAmount
  const userId = req.query.userId

  const [results] = await pool.query('UPDATE basket SET stockAmount = ? WHERE stockId = ? AND userId = ?', [stockAmount,stockId,userId]).catch((err) => {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
    return null;
  });
  
  pool.destroy();
  res.status(201).json({"Status": "Basket Updated"});
}