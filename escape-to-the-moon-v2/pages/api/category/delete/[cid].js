import mysql from 'mysql2';

export default async function handler(req, res) {
  const { cid } = req.query;

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "to_da_moon"
  });

  try {
    await con.promise().connect();
    await con.promise().query('DELETE FROM subcategory WHERE category_id = ?', cid);
    await con.promise().query('DELETE FROM category WHERE cat_id = ?', cid);

    res.status(201).json({"Status": "Category and SubCategory Removed"});
    con.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({"Status": "Internal Server Error"});
    con.end();
  }
}
