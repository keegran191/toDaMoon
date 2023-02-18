var mysql = require('mysql2');

export default async function handler(req, res) {

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "to_da_moon"
    }); 

    const Id = req.params.Id

    con.connect(async (err) => {
      if (err) throw (err)
      con.query('DELETE FROM category WHERE id = ?', Id, function(err, rs){
        if (err) throw err
        console.log(rs)
        res.status(201)
      }) 
   
  })
}