import pool from "../../../lib/database";

export default async function handler(req, res) {
  const { search } = req.query;

  try {
    const [results] = await pool.query(
      'SELECT * FROM stock WHERE Title LIKE ? OR StockType LIKE ? OR Process LIKE ? OR Roast LIKE ? OR Flavor LIKE ? OR CategoryId LIKE ? OR SubCategoryId LIKE ?',
      [`%${search}%`, `%${search}%`, `%${search}%`,`%${search}%`, `%${search}%`, `%${search}%`]
    );

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ "Status": "Database Error" });
  }
}
