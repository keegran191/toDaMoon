import pool from "../../../lib/database";

export default async function handler(req, res) {
  const name = req.query.name;
  const detail = req.query.detail;
  const subdistrict = req.query.subdistrict;
  const district = req.query.district;
  const province = req.query.province;
  const zipCode = req.query.zipCode;
  const userId = req.query.userId;

  try {
    const [results] = await pool.query(
      'UPDATE address SET name = ?, detail = ?, subdistrict = ?, district = ?, province = ?, zipCode = ?, userId = ?',
      [name, detail, subdistrict, district, province, zipCode, userId]
    );
   //pool.end();
    res.redirect(307, '/usermanagement');
  } catch (err) {
    res.status(500).json({ "Status": "Database Error" });
    console.error(err);
  }
}
