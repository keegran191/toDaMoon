var mysql = require('mysql2/promise')

export default async function handler(req, res) {

    var conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "to_da_moon"
    }); 
    try{
      
        const get_query = 'SELECT * FROM category'
        const [data] = await (await conn).query(get_query)
        
        res.status(200).json({results:data})
        
     
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
  }