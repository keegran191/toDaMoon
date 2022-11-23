import Cookies from "js-cookie";
import { useRouter } from "next/router";

var mysql = require('mysql2');
const bcrypt = require("bcrypt")

export default function handler(req, res) {

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "to_da_moon"
    }); 
    const { floating_email, floating_password } = req.body;

    
    if(floating_email == 'admin' && floating_password == 'admin'){
      console.log('yay')
      Cookies.set("loggedin" ,"true")
      res.redirect(307, '/adminpage')
      res.status(201)}
    else{
      res.redirect(307, '/login?errorMsg=WrongEmailOrPassword&errObj=')
      res.status(409)
    }
    
}