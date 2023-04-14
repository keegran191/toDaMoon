import mysql from 'mysql2';

export default async function handler(req, res) {
  const { scid } = req.query;

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "to_da_moon"
  });

  try {
    await con.promise().connect();
    await con.promise().query('DELETE FROM subcategory WHERE sub_id = ?', scid);

    res.status(201).json({"Status": "SubCategory Removed"});
    con.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({"Status": "Internal Server Error"});
    con.end();
  }
}
