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
    con.connect( async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM users WHERE email = ?"
        const search_query = mysql.format(sqlSearch,[floating_email])
        const sqlInsert = "INSERT INTO `users`(`user_fname`,`user_lname`,`email`,`user_password`,`user_phone`,`is_admin`) VALUES(?,?,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert,[floating_first_name,floating_last_name,floating_email, hashedPassword,floating_phone,0])
        // ? will be replaced by values
        // ?? will be replaced by string
        connection.query (search_query, (err, result) => {
          if (err) throw (err)
          console.log("------> Search Results")
          console.log(result.length)
          if (result.length != 0) {
          console.log("------> User already exists")
          let data = {
            email: true, 
            username: true
          }
          res.redirect(307, '/register?errorMsg=User already exists&errObj='+JSON.stringify(data))
          res.status(409)
          } 
          else {
           connection.query (insert_query, (err, result)=> {
      
              if (err) throw (err)
              console.log ("--------> Created new User")
              res.redirect(307, '/login')
              console.log(result.insertId)
              res.status(201)
            })
          }
      }) //end of connection.query()
    })
  
  }
