import { query } from "../../lib/database";

export default async function handler(req, res) {
    
    try {
        const querySql = "SELECT `id`, `user_fname`, `user_lname`, `email`, `user_password`, `user_phone`, `is_admin` FROM users"
        const value = [];
        const data = await query({ query: querySql, value: value});

        res.status(200).json({ users: data});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}