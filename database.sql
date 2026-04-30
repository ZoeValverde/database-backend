/* ´Primero creo una base de datos*/
/*Voy a http://localhost/phpmyadmin y creo una base de datos*/

CREATE DATABASE  cli_user;
USE cli_user;

/* dentro de la base de datos creo una tabla con los siguientes comandos SQL*/

USE cli_user;

CREATE TABLE users (
  id VARCHAR(40) PRIMARY KEY,
  username VARCHAR(40),
  email VARCHAR(40),
  password VARCHAR(40)
  );