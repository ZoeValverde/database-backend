import mysql from "mysql2/promise"

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cli_crud",
    waitForConnections: true,
    connectionLimit: 1
})

export{ db}