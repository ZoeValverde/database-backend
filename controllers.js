import { db } from "./config.js"
const { database } = db

let userInvalidation = false
const usernameRegex = /^[a-zA-Z]+$/

const getUsers = async () => {

    const q = `SELECT * from users `
    const [response] = await db.query(q)
    if (response.length === 0) {
        console.log("No se encuentran usuarios")
        return
    }
    return response
}

const createUser = async (username, email, password) => {
    if (!username || !email || !password) {
        console.log("Se necesita nombre de usuario, email y constraseña para poder crear un usuario")
        return;
    }

    if (!usernameRegex.test(username)) {
        console.log("El username solo puede contener letras.")
        userInvalidation = true;
    }

    if (username.length < 4 || username.length > 10) {
        console.log("el username debe tener minimo 4 máximo 10 carácteres")
        userInvalidation = true;
    }

    if (!email.endsWith("@gmail.com")) {
        console.log("Email invalido")
        userInvalidation = true;
    }
    if (password.length < 4 || password.length > 10) {
        console.log("el password debe tener minimo 4 máximo 10 carácteres")
        userInvalidation = true
    }

    if (userInvalidation) {
        return
    }
    
    const q = `INSERT INTO users (id, username, email, password) VALUES(?,?,?,?)`

    const [response] = await db.query(q, [crypto.randomUUID(), username, email, password])

    if (response.serverStatus === 2) {
        return "usuario creado"
    }
}


const updateUser = async (username, email, password, id) => {
   const q = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`
    const [response] = await db.query(q, [username, email, password, id])
    
    if (response.serverStatus===2 ) {
        return "usuario actualizado"
    }

}

const deleteUser = async (id) => {

  const q = `DELETE from users WHERE id = ?;`
    const [response] = await db.query(q, [id]);
    
    if (response.serverStatus === 2) {
        return "usuario eliminado"
    }
    
}

const deleteAll = async () => {
     const q = `DELETE from users`
    const [response] = await db.query(q);
    
    if (response.serverStatus === 2) {
        console.log("usuarios eliminado")
    }
}

export{getUsers, createUser, updateUser, deleteUser, deleteAll}