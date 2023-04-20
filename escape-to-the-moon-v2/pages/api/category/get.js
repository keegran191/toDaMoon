import { query } from "../../../lib/database";

export default async function handler(req, res) {

  try {
    const querySql = 'SELECT * FROM category';
    const values = [];
    const data = await query({ query: querySql, values: values})
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ "Status": "Database Error" });
  }
}