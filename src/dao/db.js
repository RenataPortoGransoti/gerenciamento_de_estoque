const Sequelize = require("sequelize");

const sequelize = new Sequelize("db_estoque", "root", "renata", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function () {
    console.log("Conexão realizada com sucesso!")
}).catch(function () {
    console.log("Erro na conexão");
});

module.exports = sequelize;