import db from "../../../lib/database";

export default async function handler(req, res) {

    const name = req.query.name
    const detail = req.query.detail
    const subdistrict = req.query.subdistrict
    const district = req.query.district
    const province = req.query.province
    const zipCode = req.query.zipCode
    const userId = req.query.userId
    const username = req.query.recipientName
    const phone = req.query.addressPhone

    const pool = await db.getConnection();

    const [results] = await pool.query('INSERT INTO address (name, detail, subdistrict, district, province, zipCode, userId, recipient_name, recipient_phone) VALUES (?,?,?,?,?,?,?,?,?)', [name, detail, subdistrict, district, province, zipCode, userId, username, phone]).catch((err) => {
        pool.destroy();
        res.status(500).json({ "Status": "Database Error" });
        console.error(err);
        return null;
    })
    pool.destroy();
    res.redirect(307,'/usermanagement')
}