var mysql = require('mysql2');
const bcrypt = require("bcrypt")
import db from "../../lib/database";

export default async function handler(req, res) {
  const pool = await db.getConnection();
  const {
    floating_email,
    floating_password,
    repeat_password ,
    floating_first_name,
    floating_last_name,
    floating_phone
  } = req.body;
  console.log(req.body)
  console.log(repeat_password," And ",floating_password)
  const hashedPassword = await bcrypt.hash(floating_password, 10);
  con.connect(async (err, connection) => {
    if (err) throw (err)
    const sqlSearch = "SELECT * FROM users WHERE email = ?"
    const search_query = mysql.format(sqlSearch, [floating_email])
    const sqlInsert = "INSERT INTO `users`(`user_fname`,`user_lname`,`email`,`user_password`,`user_phone`,`is_admin`) VALUES(?,?,?,?,?,?)"
    const insert_query = mysql.format(sqlInsert, [floating_first_name, floating_last_name, floating_email, hashedPassword, floating_phone, 0])
    
    await pool.query(search_query, (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      console.log(result.length)

      if (result.length != 0) {
        console.log("------> User already exists")
        let data = {
          email: true,
          username: true
        }
        pool.destroy();
        res.redirect(307, '/register?errorMsg=UserAlreadyExists&errObj=' + JSON.stringify(data))
        res.status(409)
      } else {
        console.log("this1")
        // Check if password and repeat password match
        if (floating_password !== repeat_password) {
          let data = {
            errorMsg: "PasswordNotMatch",
            errObj: {}
          };
          console.log("password not match")
          res.redirect(307, '/register?' + new URLSearchParams(data).toString());
          return;
        }

        // Password is not longer than 8 characters
        if (floating_password.length < 8) {
          let data = {
            errorMsg: "PasswordNotBigOrNot8",
            errObj: {}
          };
          pool.destroy();
          res.redirect(307, '/register?' + new URLSearchParams(data).toString());
          return;
        }
      
        // Check if password contains an uppercase letter
        if (!/[A-Z]/.test(floating_password)) {
          let data = {
            errorMsg: "PasswordNotBigOrNot8",
            errObj: {}
          };
          pool.destroy();
          res.redirect(307, '/register?' + new URLSearchParams(data).toString());
          return;
        }

        // Check if phone number < 10
        if (floating_phone.length != 10) {
          let data = {
            errorMsg: "PhoneNot10",
            errObj: {}
          };
          pool.destroy();
          res.redirect(307, '/register?' + new URLSearchParams(data).toString());
          return;
        }
        
        
        pool.query(insert_query, (err, result) => {

          if (err) throw (err)
          console.log("--------> Created new User")
          pool.destroy();
          res.redirect(307, '/login')
          console.log(result.insertId)
          res.status(201)
        })
      }
    })
  })

}