var mysql = require('mysql2');
const bcrypt = require("bcrypt")

export default async function handler(req, res) {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "to_da_moon"
  });

    con.connect(function(err) {
    con.query("SELECT * FROM category", 
    function(err, results) {
      if(err) {
        res.status(500).json({message: "Database Error"})
        return
      }
        res.status(200).json(results);
    })
  });

}