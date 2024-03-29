import db from "../../../../lib/database";
import { parse } from "cookie";

export default async function handler(req, res) {
  
  const cookies = parse(req.headers.cookie || "");
  const userId = cookies.userId; // Get the user ID from the cookie
  const pool = await db.getConnection();
  
  try {
    // Fetch user data from the database
    const [results] = await pool.query(
      "SELECT user_fname, user_lname, email, user_phone FROM users WHERE id = ?",
      [userId]
    );
    if (results.length > 0) {
      const userData = results[0];
      pool.destroy();
      return res.status(200).json({isSuccess: true, userData});
    } else {
      pool.destroy();
      return res.status(404).json({ isSuccess: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    pool.destroy();
    return res.status(500).json({ isSuccess: false, message: "Database error" });
  }
}
