import pool from "../../../lib/database";

export default async function handler(req, res) {
  
  const search = req.query.search;
  const stocktype = req.query.Stocktype
  // const { process } = req.query.Process
  // const { roast } = req.query.Roast
  // const { flavor } = req.query.Flavor
  // const { categoly } = req.query.CategolyId
  
  try {
    let query = 'SELECT * FROM stock WHERE Title LIKE ?';
    const queryParams = [`%${search}%`];

    if (stocktype && stocktype !== '0') {
      const stocktypeArray = Array.isArray(stocktype) ? stocktype : [stocktype];
      const stocktypePlaceholders = stocktypeArray.map(() => "StockType = ?");
      const stocktypeCondition = stocktypePlaceholders.join(" OR ");
      query += ' AND (' + stocktypeCondition + ')';
      queryParams.push(...stocktypeArray);
    }

    const [results] = await pool.query(query, queryParams);
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ "Status": "Database Error" });
  }
}

// 'SELECT * FROM stock WHERE Title LIKE ? OR StockType = ? OR Process = ? OR Roast = ? OR Flavor = ? OR CategoryId = ? OR SubCategoryId = ?',
// [`%${search}%`, stocktype, process, roast, flavor, categoly]