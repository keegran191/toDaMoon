var mysql = require('mysql2');
const bcrypt = require("bcrypt")

export default async function handler(req, res) {

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "to_da_moon"
    }); 

    
    
}