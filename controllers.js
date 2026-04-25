import {db} from "./config.js"

const getUsers = async () => {
    const q = `SELECT * from users `
    const [response] = await db.query(q)
    return  response }

const createUser = async (username, email, password) => {

   const q = `INSERT INTO users (id, username, email, password) VALUES(?,?,?,?)`

 const [response]= await db.query(q, [crypto.randomUUID(), username, email, password])

    if (response.serverStatus===2 ) {
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

export{getUsers, createUser, updateUser, deleteUser}