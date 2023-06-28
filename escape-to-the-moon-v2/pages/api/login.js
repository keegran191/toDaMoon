import cookie from "cookie";
import pool from "../../lib/database";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  
  const { floating_email, floating_password } = req.body;

  try {
    // Query the database to retrieve the user
    const connection = await pool.getConnection();
    const query = `SELECT * FROM users WHERE email = ?`;
    const [results] = await connection.query(query, [floating_email]);
    
    if (results.length > 0) {

      const user = results[0];
      const match = await bcrypt.compare(floating_password, user.user_password);
      const isAdmin = await connection.query(`SELECT is_admin FROM users WHERE email = ?`
      , [floating_email]);
      const isAdminValue = isAdmin[0]?.[0].is_admin;

      if (match){
        console.log("Password match!");
        if (isAdminValue === 1) {
          res.setHeader("Set-Cookie", cookie.serialize("loggedin", "abc" ,{
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60*60,
            sameSite: "strict",
            path: "/"          
          }))
          res.redirect(307, "/adminpage/category");}
        else{
            res.setHeader("Set-Cookie", cookie.serialize("loggedin", "123" ,{
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60*60,
              sameSite: "strict",
              path: "/"          
            }))
            res.redirect(307, "/adminpage/category");
          }
        console.log(isAdmin)
      } else {
        console.log("Password does not match!");
        res.redirect(307, "/login?errorMsg=WrongEmailOrPassword&errObj=");
      }
    } else {
      console.log("Email not found");
      res.redirect(307, "/login?errorMsg=WrongEmailOrPassword&errObj=");
    }
  } catch (error) {
    console.error(error);
    res.redirect(307, "/login?errorMsg=DatabaseError&errObj=");
  }
}
