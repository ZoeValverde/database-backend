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
        console.log(`
             ===========================================
                           ❌ ERROR❌

                     No se encontró usuarios
            =============================================
            `)
        return
    }
    return response
}
//función que crea el usuario y lo persiste en la base de datos, tomando el nombre de usuario, email y la contraseña para crear el mismo
const createUser = async (username, email, password) => {

//control de errores al crear el usuario
    if (!username || !email || !password) {
        console.log(`
             =========================================================
                                   ❌ ERROR❌

              Se necesita un username, un email y una contraseña
            ========================================================
            `)
        return;
    }

    if (!usernameRegex.test(username)) {
        console.log(`
            =========================================================
                                   ❌ ERROR❌

                           El username debe tener letras 
            ========================================================
            `)
        userInvalidation = true;
    }

    if (username.length < 4 || username.length > 10) {
        console.log(`
             =========================================================
                                   ❌ ERROR❌

                El username debe tener minimo 4 máximo 10 carácteres
            ===========================================================
            `)
        userInvalidation = true;
    }

    if (!email.endsWith("@gmail.com")) {
        console.log(`
             ========================================================
                                   ❌ ERROR❌

                              El email es invalido. 
                    Debe tener con finalización "@gmail.com"
            =========================================================
            `)
        userInvalidation = true;
    }
    if (password.length < 3 || password.length > 10) {
        console.log(`
             =========================================================
                                   ❌ ERROR❌

                El password debe tener minimo 4 máximo 10 carácteres
            ===========================================================
            `)
        userInvalidation = true
    }
//En caso de que userInvalidation sea positivo se retorna, evita ejecutar el Query
    if (userInvalidation) {
        return
    }

    const data = {
        username,
        email,
        password
    }
//Se crea un Query para crear en users un objeto con los siguientes datos
    const q = `INSERT INTO users (id, username, email, password) VALUES(?,?,?,?)`

    const [response] = await db.query(q, [crypto.randomUUID(), username, email, password])
     
    if (response.serverStatus === 2) {
        return `
             ======================================================
                            ✅ Ejecución con éxito✅

                    El usuario se ha creado correctamente
            ===========================================================`
    }
}

//En esta funcion actualiza el usuario que yo prefiera, escribiendo los datos a actualizar y el id 
const updateUser = async (newUsername, newEmail, newPassword, id) => {

    //control de errores con lo necesario que los datos de usuario sean validos
    if (!newUsername || !newEmail || !newPassword || !id) {
        console.log(`
            ================================================================
                                     ❌ ERROR❌

              Para poder actualizar se necesita el username, email, password
                       y el id del usuario que quiero editar
                           
            =================================================================
            `)
        return
    }

    if (!usernameRegex.test(newUsername)) {
        console.log(`
            ==========================================================
                                   ❌ ERROR❌

                El username debe tener minimo 4 máximo 10 carácteres
            ===========================================================
            `)
        userInvalidation = true;
    }

    if (newUsername.length < 4 || newUsername.length > 10) {
        console.log(`
            =========================================================
                                   ❌ ERROR❌

                El username debe tener minimo 4 máximo 10 carácteres
            ===========================================================
            `)
        userInvalidation = true;
    }

    if (!newEmail.endsWith("@gmail.com")) {
        console.log(`
            ========================================================
                                   ❌ ERROR❌

                              El email es invalido. 
                    Debe tener con finalización "@gmail.com"
            =========================================================
            `)
        userInvalidation = true;
    }
    if (newPassword.length < 4 || newPassword.length > 10) {
        console.log(`
            =========================================================
                                   ❌ ERROR❌

                El username debe tener minimo 4 máximo 10 carácteres
            ===========================================================
            `)
        userInvalidation = true
    }

    if (userInvalidation) {
        return
    }

   const q = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`
    const [response] = await db.query(q, [newUsername, newEmail, newPassword, id])

//Este funciona para ver si se encuentra un id como el que el cliente 
    if (response.affectedRows==0) {
        console.log(`
            =========================================================
                                   ❌ ERROR❌

                No se ha encontrado el usuario, intente con otro id
            ===========================================================
            `)
        return   
    }

//Si no hubo cambios es porque se encontraron los mismos datos, 
        if (!response.info.includes(`Changed: 1`)) {
            console.log(`
            =========================================================
                                   ❌ ERROR❌

                   Los datos son los mismos, intente con otro
            ===========================================================
                `)
            return
    }

    if (response.serverStatus===2 ) {
        return `
         ======================================================
                            ✅ Ejecución con éxito✅

                    El usuario se ha actualizado correctamente
        ===========================================================
        `
    }
}
//Función para eliminar un usuario, usando un id como parametro
const deleteUser = async (id) => {

//un if en caso de que no haya ningún id como argumento
    if (!id) {
        console.log(`
            =========================================================
                                   ❌ ERROR❌

                  Se necesita un id para poder borrar el usuario
            ===========================================================
            `)
        return
    }

  const q = `DELETE from users WHERE id = ?;`
    const [response] = await db.query(q, [id]);

//Lo mismo que en updateUser, si no hubo fila afectada es porque no se encontró un id igual al que el cliente puso como input.
    if (response.affectedRows == 0) {
        console.log(`
            =========================================================
                                   ❌ ERROR❌

                   No se ha encontrado el usuario, intente otro id
            ===========================================================
            `)
        return
    }
    
    if (response.serverStatus === 2) {
        return 
        `
          ======================================================
                            ✅ Ejecución con éxito✅

                    El usuario se ha actualizado correctamente
        ===========================================================
        `
    }
    console.log(response)
    
}
//Se exporta las funciones para que se puedan usar en el index
export{getUsers, createUser, updateUser, deleteUser}