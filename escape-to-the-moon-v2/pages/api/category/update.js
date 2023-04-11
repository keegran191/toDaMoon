var mysql = require('mysql2');
import { useRouter } from 'next/router'

export default async function handler(req, res) {

  const id = req.query.id
  const label = req.query.label

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "to_da_moon"
  });

  con.connect(async (err) => {
    if (err) throw (err)
    con.query('UPDATE category SET cat_label = ? WHERE cat_id = ?', [label, id], function(err, rs){
      if (err) throw err
      console.log(rs)
      res.status(201).json({"Status": "Category Updated"})
      con.end();
    })
  })
}