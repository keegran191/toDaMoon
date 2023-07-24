import pool from "../../../lib/database";

export default async function handler(req, res) {
  
  const  search  = req.query.search;
  const { stocktype } = req.query.Stocktype
  const { process } = req.query.Process
  const { roast } = req.query.Roast
  const { flavor } = req.query.Flavor
  const { categoly } = req.query.CategolyId
  
  console.log(search)

  try {
    const [results] = await pool.query(
      'SELECT * FROM stock WHERE Title LIKE ? OR StockType LIKE ? OR Process LIKE ? OR Roast LIKE ? OR Flavor LIKE ? OR CategoryId LIKE ? OR SubCategoryId LIKE ?',
      [`%${search}%`, `%${stocktype}%`, `%${process}%`,`%${roast}%`, `%${flavor}%`, `%${categoly}%`]
    );

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ "Status": "Database Error" });
  }
}
