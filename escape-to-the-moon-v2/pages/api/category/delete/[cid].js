import { query } from "../../../../lib/database";

export default async function handler(req, res) {

  const { cid } = req.query;

  try {
    const deleteCat = await query({
      query:'DELETE c, s FROM category c LEFT JOIN subcategory s ON c.cat_id = s.category_id WHERE c.cat_id = ?',
      values:[cid]
    });

    if (deleteCat.affectedRows){
      console.log("Delete success")
      res.status(201).json({"Status": "Deleted"});
    } else {
      console.log("Delete fail")
      res.status(400).json({ "Status": "fail" });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({"Status": "Internal Server Error"});
  }
}

