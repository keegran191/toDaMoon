import { query } from "../../../lib/database";

export default async function handler(req, res) {

    try {
      const newCategory = req.body.AddCategory
      const addCat = await query({ 
        query:'INSERT INTO `category`(`cat_label`) VALUES(?)',
        values:[newCategory]
      });
      if (addCat.insertId){
        console.log("insert category success")
      } else {
        console.log("insert category fail")
      }
      res.redirect(307, '/adminpage')
      res.status(200)

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Database Error' });
    }
    /*
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
            con.end();
          })
        }
      }) //end of connection.query()
   */
  }