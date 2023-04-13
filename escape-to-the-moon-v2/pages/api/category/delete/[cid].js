var mysql = require('mysql2');

export default async function handler(req, res) {

  const { cid } = req.query

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "to_da_moon"
  });

  con.connect(async (err) => {
    if (err) throw (err)

    // Use Promise.all() to wait for both queries to complete
    Promise.all([
      new Promise((resolve, reject) => {
        con.query('DELETE FROM subcategory WHERE category_id = ?', cid, function (err, rs) {
          if (err) reject(err);
          resolve();
        })
      }),
      new Promise((resolve, reject) => {
        con.query('DELETE FROM category WHERE cat_id = ?', cid, function(err, rs){
          if (err) reject(err);
          resolve();
        })
      })
    ]).then(() => {
      // Send the response after both queries have completed
      res.status(201).json({"Status": "Category and SubCategory Removed"});
      con.end();
    }).catch((err) => {
      // Handle any errors that occurred during the queries
      console.error(err);
      res.status(500).json({"Status": "Internal Server Error"});
      con.end();
    });
  });
}
