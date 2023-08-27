import * as mysql from "mysql2/promise";


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'to_the_moon',
    password: '1212312121',
    waitForConnections: true,
    connectionLimit: 500000000,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 100
});

export default pool;