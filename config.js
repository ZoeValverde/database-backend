//import mysql en mi projecto

import mysql from "mysql2/promise"

//Creo la conexión de la base de datos a mi projecto 
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cli_crud",
    waitForConnections: true,
    connectionLimit: 1
})

export{ db}