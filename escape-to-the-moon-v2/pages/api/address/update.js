import db from "../../../lib/database";

export default async function handler(req, res) {
  const name = req.query.name;
  const detail = req.query.detail;
  const subdistrict = req.query.subdistrict;
  const district = req.query.district;
  const province = req.query.province;
  const zipCode = req.query.zipCode;
  const userId = req.query.userId;
  const recipientName = req.query.recipientName;
  const addressPhone = req.query.addressPhone;

  const pool = await db.getConnection();

  try {
    const [results] = await pool.query(
      'UPDATE address SET name = ?, detail = ?, subdistrict = ?, district = ?, province = ?, zipCode = ?, userId = ?, recipient_name = ?, recipient_phone = ?',
      [name, detail, subdistrict, district, province, zipCode, userId, recipientName, addressPhone]
    );
    pool.destroy();
    res.redirect(307, '/usermanagement');
  } catch (err) {
    pool.destroy();
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
  }
}
