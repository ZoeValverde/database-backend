import { getUsers, updateUser, createUser, deleteUser } from "./controllers.js"

const argv = process.argv
const params = argv.slice(2)
const operacion = params[0]
let resultado


switch (operacion) {
    case "get":
        resultado = await getUsers()
        break
    case "add":
        resultado= await createUser(params[1], params[2], params[3])
        break
    case "update":
        resultado =await updateUser(params[1], params[2], params[3], params[4])
        break
    case "delete":
        resultado = await deleteUser(params[1])
        break
    default:
        resultado= "Se necesita una operación valida"
}

const main = () => {
    if (resultado=== undefined) {
      return
    }
    console.log(resultado)
}

main()