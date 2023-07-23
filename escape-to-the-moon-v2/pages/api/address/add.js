import pool from "../../../lib/database";

export default async function handler(req, res) {

    const name = req.query.name
    const detail = req.query.detail
    const subdistrict = req.query.subdistrict
    const district = req.query.district
    const province = req.query.province
    const zipCode = req.query.zipCode
    const userId = req.query.userId

    const [results] = await pool.query('INSERT INTO address (name, detail, subdistrict, district, province, zipCode, userId) VALUES (?,?,?,?,?,?,?)', [name, detail, subdistrict, district, province, zipCode, userId]).catch((err) => {
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    })
    console.log(results.insertId);
    res.redirect(307,'/usermanagement')
}