import cookie from "cookie";
import db from "../../lib/database";
import http from 'http';

const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  const floating_email = req.query.email
  const floating_password = req.query.password

  const pool = await db.getConnection();
  
  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [results] = await pool.query(query, [floating_email]);

    if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(floating_password, user.user_password);
      const isAdmin = await pool.query(`SELECT is_admin FROM users WHERE email = ?`, [floating_email]);
      const isAdminValue = isAdmin[0]?.[0].is_admin;
     
      if (match) {
        console.log("Password match!");
        
        const cookies = [
          cookie.serialize("loggedin", user.is_admin, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 24 * 60 * 60,
            sameSite: "strict",
            path: "/"
          }),
          cookie.serialize("fname", user.user_fname, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 24 * 60 * 60,
            sameSite: "strict",
            path: "/"
          }),
          cookie.serialize("userId", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 24 * 60 * 60,
            sameSite: "strict",
            path: "/"
          })
        ];
        console.log(isAdminValue)
        if (isAdminValue === 1) {
          res.setHeader("Set-Cookie", cookies);
          console.log("isAdmin")
          pool.destroy();
          
          res.status(200).json({ Status:"isAdminLogin" })
        } else {
          res.setHeader("Set-Cookie", cookies);
          console.log("isNotAdmin")
          pool.destroy();
          
          res.writeHead(307, { 'Location': '/' });
        }
      } else {
        console.log("Password does not match!");
        pool.destroy();
        res.status(200).json({ Status:"EmailOrPassNotValid" })
      }
    } else {
      console.log("Email not found");
      pool.destroy();
      res.status(200).json({ Status:"EmailOrPassNotValid" })
    }
  } catch (error) {
    pool.destroy();
    res.status(500).json({ Status:"Database Error" })
    console.log(err);
    return null;
  }
}
