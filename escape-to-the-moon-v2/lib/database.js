import * as mysql from "mysql2/promise";


export default mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'to_da_moon',
    password: '',
});