import mysql from "mysql2/promise";

export async function query(){

    const dbConnection = await mysql.createConnection({
        host:"localhost",
        user: "root",
        password: "",
        database: "to_da_moon"
            
    });
    
}