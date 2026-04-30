## CLI gestión de usuarios 

Esta es una aplicación hecha con Node.js. Ejecutada en un CLI para poder crear, leer, actualizar y borrar usuarios.

#### TECNOLOGÍAS USADAS PARA EL PROYECTO
- Javascript
- MYSQL
- Node.js

### Estructura

#### Index.js
Aquí es donde se ejecutan las operaciones y se maneja los argumentos.

#### Config.js
En este archivo se ejecuta la conexión de la base de dato.

#### Controller.js
Dentro de este archivo se ejecuta el CRUD del proyecto.

#### package.json y package-lock.json
La identidad del proyecto.

### Como ejecutar la aplicación

Pasos:
Paso 1: clonar el repositorio.

Paso 2: ir al Git Bash y poner los comandos "Git clone + link del repositorio".

Paso 3: Abrir la carpeta en  Visual Studio Code y descargar mysql2 y las dependencias.

Paso 4: Crear una base de datos en localhost/phpMyAdmin usando los datos que aparecen en el archivo user.sql.

Ya creado y teniendo XAMPP ya ejecutado ya está listo para usarse .

## Como usar la aplicación

Para poder ejecutar cualquier operación se debe de ejecutar :

node index.js o npm run dev

#####   CREAR UN USUARIO

Para poder crear un usuario se necesita un nombre de usuario, email y contraseña usando la operación **add**

**Condiciones para los datos del usuario**

*Username*
Deben ser letras y debe tener entre 4 a 10 carácteres.

*Email*
Debe tener la terminación "@gmail.com".

*Password*
Debe tener entre 4 a 10 carácteres.

*Formato de ejecución en la terminal*

node index.js add < username > < email> < password >

*Por ejemplo:*

node index.js add jose jose@gmail.com 1234


#####   MOSTRAR LOS USUARIOS

Para poder leer los usuarios se debe de usando la operación **get**

*Formato de ejecución en la terminal*

node index.js get

#####   ACTUALIZAR UN USUARIO

Para poder actualizar un usuario se necesita un nombre de usuario, email, contraseña  y el id del usuario que quiero modificar. Para poder actualizar hay que utilizar la operación **update**

**Condiciones para los datos del usuario**

*Username*
Deben ser letras y debe tener entre 4 a 10 carácteres.

*Email*
Debe tener la terminación "@gmail.com".

*Password*
Debe tener entre 4 a 10 carácteres.

*Formato de ejecución en la terminal*

node index.js update < username > < email> < password > < id >

*Por ejemplo:*

node index.js update rosa rosa@gmail.com 4321 e5408692-10be-450b-8ed4-0947708e1a40

#####   ELIMINAR UN USUARIO

Para poder eliminar un usuario necesita el id del usuario a eliminar. Se debe de usando la operación **delete**

*Formato de ejecución en la terminal*

node index.js delete < id >

*Por ejemplo:*

node index.js delete e5408692-10be-450b-8ed4-0947708e1a40



