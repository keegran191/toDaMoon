import db from "../../lib/database";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  
  const email = req.query.email
  const password = req.query.password
  const fname = req.query.fname
  const sname = req.query.sname
  const phone = req.query.phone

  const pool = await db.getConnection();

  const hashedPassword = await bcrypt.hash(password, 10);

  const [emailValid] = await pool.query('SELECT * FROM users WHERE email = ?', [email]).catch((err)=> {
    pool.destroy();
    res.status(500).json({ Status:"Database Error" })
    console.log(err);
    return null;
  })

  console.log("Out" + emailValid);

  if (emailValid.length > 0) {
    console.log("Have Email:" + emailValid.length);
    pool.destroy();
    res.status(200).json({ Status:"EmailIsNotValid" })
    return null;
  } else if (emailValid.length == 0) {
    console.log("Not Have Email:" + emailValid.length);
    const [results] = await pool.query('INSERT INTO users (user_fname, user_lname, email, user_password, user_phone, is_admin) VALUES (?, ?, ?, ?, ?, ?)',[fname, sname, email, hashedPassword, phone, 0]).catch((err) => {
      pool.destroy();
      res.status(500).json({ Status:"Database Error" });
      console.error(err);
      return null;
    })

    pool.destroy();
    res.status(200).json({ Status:"RegisterSuccess" });
  }
  
  // try {
  //   const {
  //     floating_email,
  //     floating_password,
  //     repeat_password,
  //     floating_first_name,
  //     floating_last_name,
  //     floating_phone,
  //   } = req.body;

  //   const hashedPassword = await bcrypt.hash(floating_password, 10);

  //   try {
  //     const [searchResults] = await pool.query('SELECT * FROM users WHERE email = ?', [floating_email]);

  //     if (searchResults.length !== 0) {
  //       console.log('User already exists');
  //       pool.destroy();
  //       res.redirect(307, '/register?errorMsg=UserAlreadyExists&errObj=');
  //     } else {
  //       if (floating_password !== repeat_password) {
  //         pool.destroy();
  //         res.redirect(307, '/register?errorMsg=PasswordNotMatch&errObj=');
  //         return;
  //       }

  //       if (floating_password.length < 8 || !/[A-Z]/.test(floating_password)) {
  //         pool.destroy();
  //         res.redirect(307, '/register?errorMsg=PasswordRequirementsNotMet&errObj=');
  //         return;
  //       }

  //       if (floating_phone.length !== 10) {
  //         pool.destroy();
  //         res.redirect(307, '/register?errorMsg=PhoneNot10&errObj=');
  //         return;
  //       }

  //       const insertQuery = 'INSERT INTO users (user_fname, user_lname, email, user_password, user_phone, is_admin) VALUES (?, ?, ?, ?, ?, ?)';
  //       const insertValues = [floating_first_name, floating_last_name, floating_email, hashedPassword, floating_phone, 0];

  //       const [insertResult] = await pool.query(insertQuery, insertValues);

  //       console.log('Created new User');
  //       pool.destroy();
  //       res.redirect(307, '/login');
  //       console.log(insertResult.insertId);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     pool.destroy();
  //     res.redirect(307, '/register?errorMsg=DatabaseError&errObj=');
  //   }
  // } catch (error) {
  //   pool.destroy();
  //   console.error(error);
  //   res.redirect(307, '/register?errorMsg=DatabaseConnectionError&errObj=');
  // }
}