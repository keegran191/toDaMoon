import { query } from "../../../lib/database";

export default async function handler(req, res) {

  const id = req.query.id;
  const label = req.query.label;

  try {
    const updateCat = await query({
      query:'UPDATE category SET cat_label = ? WHERE cat_id = ?',
      values:[label, id]
    });

    if (updateCat.affectedRows){
      console.log("update category success")
      res.status(201).json({"Status": "Category Updated"});
    } else {
      console.log("update category fail")
      res.status(400).json({ "Status": "fail" });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({"Status": "Internal Server Error"});
  }
}
