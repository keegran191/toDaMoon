var mysql = require('mysql2');

export default async function handler(req, res) {

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "to_da_moon"
    });

    const newCategory = req.body.AddCategory

    con.connect(async (err) => {
      if (err) throw (err)
      const sqlSearch = 'SELECT * FROM category WHERE cat_label = ?'
      
      const search_query = mysql.format(sqlSearch, [newCategory])
      const sqlInsert = 'INSERT INTO `category`(`cat_label`) VALUES(?)'
      const insert_query = mysql.format(sqlInsert, [newCategory])

      con.query(search_query, (err, result) => {
        if (err) throw (err)
        console.log("------> Search Results")
        console.log(result.length)
        if (result.length != 0) {
          console.log("------> Category already exists")
          let data = {
            email: true,
            username: true
          }
          res.redirect(307, '/adminpage?errorMsg=CategoryAlreadyExists&errObj=' + JSON.stringify(data))
          res.status(409)
        } else {
          con.query(insert_query, (err, result) => {
  
            if (err) throw (err)
            console.log("--------> Added new Category")
            res.redirect(307, '/adminpage')
            console.log(result.insertId)
            res.status(201)
          })
        }
      }) //end of connection.query()
   
  })
}