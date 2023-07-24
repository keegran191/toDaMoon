import pool from "../../../lib/database";

export default async function handler(req, res) {
  console.log(req.query)
  const search = req.query.search;
  const stocktype = req.query.Stocktype
  const process  = req.query.Process
  const roast  = req.query.Roast
  const flavor  = req.query.Flavor
  const categoly  = req.query.CategolyId
  
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

    if (process && process !== '0') {
      const processArray = Array.isArray(process) ? process : [process];
      const processPlaceholders = processArray.map(() => "StockType = ?");
      const processCondition = processPlaceholders.join(" OR ");
      query += ' AND (' + processCondition + ')';
      queryParams.push(...processArray);
    }

    if (roast && roast !== '0') {
      const roastArray = Array.isArray(roast) ? roast : [roast];
      const roastPlaceholders = roastArray.map(() => "StockType = ?");
      const roastCondition = roastPlaceholders.join(" OR ");
      query += ' AND (' + roastCondition + ')';
      queryParams.push(...roastArray);
    }

    if (flavor && flavor !== '0') {
      const flavorArray = Array.isArray(flavor) ? flavor : [flavor];
      const flavorPlaceholders = flavorArray.map(() => "StockType = ?");
      const flavorCondition = flavorPlaceholders.join(" OR ");
      query += ' AND (' + flavorCondition + ')';
      queryParams.push(...flavorArray);
    }

    if (categoly && categoly !== '0') {
      const categolyArray = Array.isArray(categoly) ? categoly : [categoly];
      const categolyPlaceholders = categolyArray.map(() => "StockType = ?");
      const categolyCondition = categolyPlaceholders.join(" OR ");
      query += ' AND (' + categolyCondition + ')';
      queryParams.push(...categolyArray);
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