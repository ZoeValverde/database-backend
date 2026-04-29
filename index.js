//Se importa las funciones CRUD de controllers.js
import { getUsers, updateUser, createUser, deleteUser } from "./controllers.js"

//Las siguientes constantes capturan los argumentos y usa el metodo slice para que el primero (posición 0) sea la operación

const argv = process.argv
const params = argv.slice(2)
const operacion = params[0]
//Se crea un let para que al finalizar una funcion se ejecute un "resultado"
let resultado

//El siguiente Try and Catch intenta conectar las funciones de la base de datos
try {
    switch (operacion) {
        case "get":
            resultado = await getUsers()
            break
        case "add":
            resultado = await createUser(params[1], params[2], params[3])
            break
        case "update":
            resultado = await updateUser(params[1], params[2], params[3], params[4])
            break
        case "delete":
            resultado = await deleteUser(params[1])
            break
        default:
            resultado = "Se necesita una operación valida"
    }
} catch(error) {
    if (error.code==='ECONNREFUSED') {
        console.log("Hay errores de conexión con la base de datos")
    }
}

//Se crea el main para que siempre se ejecute en la consola el resultado

const main = () => {
    if (resultado === undefined) {
        return 
    }
    console.log(resultado)
}

main()
