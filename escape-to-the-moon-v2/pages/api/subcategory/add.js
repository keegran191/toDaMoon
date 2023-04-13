var mysql = require('mysql2');

export default async function handler(req, res) {

  const cid = req.query.cid
  const label = req.query.label

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "to_da_moon"
  });

  con.connect(async (err) => {
    if (err) throw (err)
    con.query('INSERT INTO subcategory (sub_label, category_id) VALUES (?,?)', [label, cid], function(err, rs){
      if (err) throw err
      console.log(rs)
      res.status(201).json({"Status": "Sub Category Added"})
      con.end();
    })
  })
}