const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const bd = require('./dao/db.js');
//const Usuario = require('./modles/usuario');
//const Controller = require | ('./controller/usuario_controller');

app.use(express.json());
app.use(bodyParser.urlencoded({ extend: true }));
//app.use(UsuarioController);

app.listen(3333, () => {
    console.log("Servidor rodando")
});