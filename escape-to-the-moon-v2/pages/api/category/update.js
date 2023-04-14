import mysql from 'mysql2';
import { useRouter } from 'next/router'

export default async function handler(req, res) {
  const id = req.query.id;
  const label = req.query.label;

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "to_da_moon"
  });

  try {
    await con.promise().connect();
    const [rows] = await con.promise().query('UPDATE category SET cat_label = ? WHERE cat_id = ?', [label, id]);
    console.log(rows);
    res.status(201).json({"Status": "Category Updated"});
    con.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({"Status": "Internal Server Error"});
    con.end();
  }
}
