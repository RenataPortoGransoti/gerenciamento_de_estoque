const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("./session");

const app = express();
app.use(express.json());
app.use(session);

app.use(bodyParser.urlencoded({ extend: true }));

const Controller = require | ('./controller/usuario_controller');

app.set('views', path.join(__dirname, '../', 'paginas'));
app.set('view engine', 'ejs');

app.use(UsuarioController);

//CONFIGURAÇÃO DO CSS
//app.use(express.static('paginas'));
const paginasPath = path.join(__dirname, '../', 'paginas');
app.use('/paginas', express.static(paginasPath, {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    },
}));

//app.use(router);

const bd = require('./dao/db.js');
const Usuario = require('./models/usuario');


app.use(Usuario);

app.listen(3333, () => {
    console.log("Servidor rodando")
});