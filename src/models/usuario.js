//CRIANDO UMA TABELA NO BANCO DE DADOS.

const Sequelize = require('sequelize');
const db = require('../dao/db');

const Usuario = db.define(
    'Usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
);

//COMANDO PARA CRIAR A TABELA NO BANCO DE DADOS
Usuario.sync();

//VERIFICA SE TEM ALGUMA ALTERAÇÃO NA TABELA PARA INSERIR OS NOVOS CAMPOS
//Usuario.sync({alter: true});
module.exports = Usuario;