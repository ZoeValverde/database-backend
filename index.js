import { getUsers, updateUser, createUser, deleteUser } from "./controllers.js"

const argv = process.argv
const params = argv.slice(2)
const operacion = params[0]
let resultado

switch (operacion) {
    case "get":
        resultado = getUsers()
        break
    case "add":
        resultado= createUser()
        break
    case "update":
        resultado = updateUser()
        break
    case "delete":
        resultado = deleteUser()
        break
    default:
        resultado= "operacion invalida"
}

const main = () => {
  console.log(resultado)
}

main()