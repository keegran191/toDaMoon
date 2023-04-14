import mysql from 'mysql2';

export default async function handler(req, res) {

  const cid = req.query.cid;
  const label = req.query.label;

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "to_da_moon"
  });

  try {
    await con.promise().connect();
    const [rows, fields] = await con.promise().execute('INSERT INTO subcategory (sub_label, category_id) VALUES (?,?)', [label, cid]);
    console.log(rows);
    res.status(201).json({"Status": "Sub Category Added"});
  } catch (err) {
    console.error(err);
    res.status(500).json({"Status": "Internal Server Error"});
  } finally {
    con.end();
  }
}
