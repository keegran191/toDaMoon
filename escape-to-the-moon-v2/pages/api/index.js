// const express = require('express');
// const path = require('path');
// const cookieSession = require('cookie-session');
// const bcrypt = require('bcrypt');
// const dbConnection = require('./database');
// const { body, validationResult } = require('express-validator');

// const app = express();
// app.use(express.urlencoded({extended:false}));

// // SET OUR VIEWS AND VIEW ENGINE
// app.set('pages', __dirname + '../pages');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// // APPLY COOKIE SESSION MIDDLEWARE
// app.use(cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2']
    
// }));

// // DECLARING CUSTOM MIDDLEWARE
// const ifNotLoggedin = (req, res, next) => {
//     if(!req.session.isLoggedIn){
//         return res.render('login');
//     }
//     next();
// }

// const ifLoggedin = (req, res, next) => {
//     if (req.session.isLoggedIn) {
//         return res.redirect('/home');
//     }
//     next();
// }


// // REGISTER PAGE
// app.post('/register', ifLoggedin, 
// // post data validation(using express-validator)
// [
//     body('floating_email','Invalid email address!').isEmail().custom((value) => {
//         return dbConnection.execute('SELECT `email` FROM `users` WHERE `email`=?', [value])
//         .then(([rows]) => {
//             if(rows.length > 0){
//                 return Promise.reject('This E-mail already in use!');
//             }
//             return true;
//         });
//     }),
//     body('user_name','Username is Empty!').trim().not().isEmpty(),
//     body('user_pass','The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),

// ],// end of post data validation

// (req,res,next) => {

//     const validation_result = validationResult(req);
//     const {floating_email,
//         floating_password,
//         floating_first_name,
//         floating_last_name,
//         floating_phone} = req.body;
//     // IF validation_result HAS NO ERROR
//     if(validation_result.isEmpty()){
//         // password encryption (using bcryptjs)
//         bcrypt.hash(floating_password, 12).then((hash_pass) => {
//             // INSERTING USER INTO DATABASE
//             dbConnection.execute("INSERT INTO `users`(`user_fname`,`user_lname`,`email`,`user_password`,`user_phone`,`is_admin`) VALUES(?,?,?,?,?,?)",
//              [floating_first_name,floating_last_name,floating_email, hash_pass,floating_phone,0])
//             .catch(err => {
//                 // THROW INSERTING USER ERROR'S
//                 if (err) throw err;
//             });
//         })
//         .catch(err => {
//             // THROW HASING ERROR'S
//             if (err) throw err;
//         })
//     }
//     else{
        
//         res.render('register',{});
//     }
// });// END OF REGISTER PAGE


// // LOGIN PAGE
// app.post('/', ifLoggedin, [
//     body('user_email').custom((value) => {
//         return dbConnection.execute('SELECT email FROM users WHERE email=?', [value])
//         .then(([rows]) => {
//             if(rows.length == 1){
//                 return true;
                
//             }
//             return Promise.reject('Invalid Email Address!');
            
//         });
//     }),
//     body('user_pass','Password is empty!').trim().not().isEmpty(),
// ], (req, res) => {
//     const validation_result = validationResult(req);
//     const {user_pass, user_email} = req.body;
//     if(validation_result.isEmpty()){
        
//         dbConnection.execute("SELECT * FROM `users` WHERE `email`=?",[user_email])
//         .then(([rows]) => {
//             bcrypt.compare(user_pass, rows[0].password).then(compare_result => {
//                 if(compare_result === true){
//                     req.session.isLoggedIn = true;
//                     req.session.userID = rows[0].id;

//                     res.redirect('/');
//                 }
//                 else{
//                     res.render('login-register',{
//                         login_errors:['Invalid Password!']
//                     });
//                 }
//             })
//             .catch(err => {
//                 if (err) throw err;
//             });


//         }).catch(err => {
//             if (err) throw err;
//         });
//     }
//     else{
//         let allErrors = validation_result.errors.map((error) => {
//             return error.msg;
//         });
//         // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
//         res.render('login-register',{
//             login_errors:allErrors
//         });
//     }
// });
// // END OF LOGIN PAGE

// // LOGOUT
// app.get('/logout',(req,res)=>{
//     //session destroy
//     req.session = null;
//     res.redirect('/');
// });
// // END OF LOGOUT

// app.use('/', (req,res) => {
//     res.status(404).send('<h1>404 Page Not Found!</h1>');
// });



// app.listen(3000, () => console.log("Server is Running..."));