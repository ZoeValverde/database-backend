import { db } from "./config.js"

const getUsers = () => {
    console.log("leyendo usuario")
}

const createUser = async (username, email, password) => {
    
}

const updateUser = (id, updates) => {
    console.log("usuario actualizado")
}

const deleteUser = (id) => {
    console.log("usuario eliminado")
}

export{getUsers, updateUser, deleteUser, createUser}