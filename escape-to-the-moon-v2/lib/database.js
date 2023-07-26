import * as mysql from "mysql2/promise";


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'to_da_moon',
    password: '',
    waitForConnections: true,
    connectionLimit: 500000000,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});

export default pool;