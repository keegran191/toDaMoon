import db from "../../../lib/database";
import bcrypt from 'bcrypt';
import { parse } from 'cookie';

export default async function handler(req, res) {
    const pool = await db.getConnection();
    const password = req.query.password;
    const newPassword = req.query.newPassword
    const confirmNewPassword = req.query.confirmNewPassword
    const formadmin = req.query.formadmin
    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
        pool.destroy();
        console.log("new password and confirm password not match")
        if(formadmin == 1) {
            res.redirect(200, '/adminpage/adminmanagement?errorMsg=NewPasswordAndConfirmNewPasswordNotMatch');
        } else {
            res.redirect(200, '/usermanagement?errorMsg=NewPasswordAndConfirmNewPasswordNotMatch');
        }
        return
    }
    
    const cookies = parse(req.headers.cookie || '');
    const userId = cookies.userId; // Get the user ID from the cookie
    
    try {
        const query = `SELECT * FROM users WHERE id = ?`;
        const [results] = await pool.query(query, [userId]);
        
        if (results.length === 0) {
            console.log("User not found")  
            pool.destroy();
            if(formadmin == 1) {
                res.redirect(200, '/adminpage/adminmanagement').json({ isSuccess: false, message: "User not found" });
            } else {
                res.redirect(200, '/usermanagement').json({ isSuccess: false, message: "User not found" });
            }
            return 
        }
        
        const user = results[0];
        
        // Compare the current password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.user_password);
        
        if (!isPasswordMatch) {
            console.log("Invalid password.")
            pool.destroy();
            if(formadmin == 1) {
                res.status(200).json({ isSuccess: false, message: "Invalid password" });
            } else {
                res.status(200).json({ isSuccess: false, message: "Invalid password" });
            }
            return
        }

        // Update the user's password with the new hashed password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        
        const updateQuery = `UPDATE users SET user_password = ? WHERE id = ?`;
        await pool.query(updateQuery, [hashedNewPassword, user.id]);
        console.log("Password updated successfully.")
        pool.destroy();
        return res.status(200).json({ isSuccess: true, message: "Password updated successfully." });
    } catch (error) {
        console.log("err")
        console.error(error);
        pool.destroy();
        return res.status(500).json({ isSuccess: false, message: "Database error." });
    }
}
