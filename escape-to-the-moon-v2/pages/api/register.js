var mysql = require('mysql2');
const bcrypt = require("bcrypt")

export default async function handler(req, res) {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "to_da_moon"
  });
  const {floating_email,
    floating_password,
    floating_first_name,
    floating_last_name,
    floating_phone} = req.body;

  const hashedPassword = await bcrypt.hash(floating_password,10);  
  con.connect(function(err) {
      
    con.execute("INSERT INTO `users`(`user_fname`,`user_lname`,`email`,`user_password`,`user_phone`,`is_admin`) VALUES(?,?,?,?,?,?)",
    [floating_first_name,floating_last_name,floating_email, hashedPassword,floating_phone,0])
    console.log(req.body)
    res.status(200).json({ message: 'Success'})
    
  });

}