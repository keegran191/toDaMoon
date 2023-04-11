var mysql = require('mysql2');
const bcrypt = require("bcrypt")

export default async function handler(req, res) {

    const { cid } = req.query

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "to_da_moon"
    });

        con.connect(function(err) {
        con.query("SELECT * FROM subcategory WHERE category_id = ? OR category_id IS NULL" , cid, 
        function(err, results, fields) {
        if(err) {
            res.status(500).json({message: "Database Error"})
            return
        }
            res.status(200).json(results);
        })
    });

}