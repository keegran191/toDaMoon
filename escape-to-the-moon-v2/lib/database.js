import mysql from "mysql2/promise";

export async function query({query, values = []}){

    const dbConnection = await mysql.createConnection({
        host:"localhost",
        user: "root",
        password: "",
        database: "to_da_moon"
            
    });
    try {
        const [results] = await dbConnection.execute(query, values);
        dbConnection.end();
        return results;
    } catch (error) {
        throw Error(error.message);
        return {error};
    }
    
}