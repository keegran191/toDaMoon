import pool from "../../../lib/database";
import { parse, serialize } from 'cookie';

export default async function handler(req, res) {
    const fName = req.query.Fname;
    const lName = req.query.Sname;
    const email = req.query.Email;
    const phone = req.query.Phone;

    const cookies = parse(req.headers.cookie || '');
    const userId = cookies.userId; // Get the user ID from the cookie

    try {
        // Update user data in the database
        const [results] = await pool.query('UPDATE users SET user_fname = ?, user_lname = ?, email = ?, user_phone = ? WHERE id = ?', [fName, lName, email, phone, userId]);
        console.log("update user success");

        // Update the fname value in the cookies
        const updatedCookies = {
            ...cookies,
            fname: fName // Update the fname value with the new value
        };

        // Serialize the updated cookies and set them in the response headers
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/"
        };

        const cookieStrings = Object.keys(updatedCookies).map((cookieName) =>
            serialize(cookieName, updatedCookies[cookieName], cookieOptions)
        );

        res.setHeader("Set-Cookie", cookieStrings);

        res.status(200).json({ isSuccess: true, message: "User Updated" });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: "Database error." });
        console.error(err);
    }
}
