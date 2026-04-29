//se importa la conexión de la base de datos desde el config.js
import { db } from "./config.js"

// la validación del usuario 
let userInvalidation = false
//expresión que permite unicamente letras en username
const usernameRegex = /^[a-zA-Z]+$/

//En esta función lee los usuarios de la base de datos y lo muestra en la consola
const getUsers = async () => {

//Se crea un query con SQL para usar SELECT y mostrar en la terminal los usuarios guardados en la base de datos
    const q = `SELECT * from users `
    const [response] = await db.query(q)

    //En caso de no haber ningún usuario aparece el error
    if (response.length === 0) {
        console.log("No se están encontrando usuarios")
        return
    }
    return response
}
//función que crea el usuario y lo persiste en la base de datos, tomando el nombre de usuario, email y la contraseña para crear el mismo
const createUser = async (username, email, password) => {

//control de errores al crear el usuario
    if (!username || !email || !password) {
        console.log("Se necesita nombre de usuario, email y constraseña para poder crear un usuario")
        return;
    }

    if (!usernameRegex.test(username)) {
        console.log("El username solo puede contener letras." )
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
    if (password.length < 3 || password.length > 10) {
        console.log("el password debe tener minimo 4 máximo 10 carácteres")
        userInvalidation = true
    }
//En caso de que userInvalidation sea positivo se retorna, evita ejecutar el Query
    if (userInvalidation) {
        return
    }

//Se crea un Query para crear en users un objeto con los siguientes datos
    const q = `INSERT INTO users (id, username, email, password) VALUES(?,?,?,?)`

    const [response] = await db.query(q, [crypto.randomUUID(), username, email, password])

    if (response.serverStatus === 2) {
        return "el usuario de ha creado con éxito"
    }
}

//En esta funcion actualiza el usuario que yo prefiera, escribiendo los datos a actualizar y el id 
const updateUser = async (newUsername, newEmail, newPassword, id) => {

    //control de errores con lo necesario que los datos de usuario sean validos
    if (!newUsername || !newEmail || !newPassword || !id) {
        console.log("Se necesita nombre de usuario, email, constraseña y el id para poder actualizar el usuario")
        return
    }

    if (!usernameRegex.test(newUsername)) {
        console.log("El username solo puede contener letras.")
        userInvalidation = true;
    }

    if (newUsername.length < 4 || newUsername.length > 10) {
        console.log("el username debe tener minimo 4 máximo 10 carácteres")
        userInvalidation = true;
    }

    if (!newEmail.endsWith("@gmail.com")) {
        console.log("Email invalido")
        userInvalidation = true;
    }
    if (newPassword.length < 4 || newPassword.length > 10) {
        console.log("el password debe tener minimo 4 máximo 10 carácteres")
        userInvalidation = true
    }

    if (userInvalidation) {
        return
    }

   const q = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`
    const [response] = await db.query(q, [newUsername, newEmail, newPassword, id])

//Este funciona para ver si se encuentra un id como el que el cliente 
    if (response.affectedRows==0) {
        console.log("no se encontró el id, pruebe otro")
        return   
    }

//Si no hubo cambios es porque se encontraron los mismos datos, 
        if (!response.info.includes(`Changed: 1`)) {
            console.log("Los datos son los mismos, intente con otro")
            return
    }

    if (response.serverStatus===2 ) {
        return "usuario actualizado"
    }
}
//Función para eliminar un usuario, usando un id como parametro
const deleteUser = async (id) => {

//un if en caso de que no haya ningún id como argumento
    if (!id) {
        console.log("Se necesita un id para poder eliminar el usuario")
        return
    }

  const q = `DELETE from users WHERE id = ?;`
    const [response] = await db.query(q, [id]);

//Lo mismo que en updateUser, si no hubo fila afectada es porque no se encontró un id igual al que el cliente puso como input.
    if (response.affectedRows == 0) {
        console.log("No se encuentra ese Id")
        return
    }
    
    if (response.serverStatus === 2) {
        return "usuario eliminado"
    }
    console.log(response)
    
}
//Se exporta las funciones para que se puedan usar en el index
export{getUsers, createUser, updateUser, deleteUser}