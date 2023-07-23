import pool from "../../../lib/database";
import { parse } from 'cookie';

export default async function handler(req, res) {

    const fName = req.query.Fname;
    const lName = req.query.Sname;
    const email = req.query.Email;
    const phone = req.query.Phone;

    const cookies = parse(req.headers.cookie || '');
    const userId = cookies.userId; // Get the user ID from the cookie

    try {
        const [results] = await pool.query('UPDATE users SET user_fname = ?, user_lname = ?, email = ?, user_phone = ? WHERE id = ?', [fName, lName, email, phone, userId]);
        console.log("update user success");
        res.status(200).json({ isSuccess: true, message: "User Updated" });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: "Database error." });
        console.error(err);
    }
}
