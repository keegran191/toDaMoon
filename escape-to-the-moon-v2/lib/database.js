// ../../lib/database.js

// Import the necessary MySQL library
import * as mysql from "mysql2/promise";

// Create a MySQL pool
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

// Export the 'query' variable
export const query = pool.query.bind(pool);

// Export the 'pool' itself
export default pool;
