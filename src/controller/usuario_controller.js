const express = require("express");
const path = require("path");

const spawnSync = require('child_process');

const router = express.Router();
const conexao = require('../dao/db');
const Usuario = require('../models/usuario');

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../paginas", "index.html"));
});

router.post("/", async (req, res) => {
    var campo_email = req.body.email;
    var campo_senha = req.body.senha;

    const usuario = await Usuario.findOne({
        attributes: ['id', 'nome', 'email', 'senha'],
        where: {
            email: campo_email
        }
    })

    if (usuario === null) {
        console.log("Usuário ou senha inválida");
        res.sendFile(path.join(__dirname, "../../paginas", "index.html"));
    }

    if (campo_email == usuario.email && campo_senha == usuario.senha) {
        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
        res.sendFile(path.join(__dirname, "../../paginas", "principal.html"));
    } else {
        console.log("Usuário ou senha inválida");
        res.sendFile(path.join(__dirname, "../../paginas", "index.html"));
    }
});

router.post("/realizarLoginAPI", async (req, res) => {
    var email = req.body.email;
    var senha = req.body.senha;

    console.log(email);

    const usuario = await Usuario.findOne({
        attributes: ['id', 'nome', 'email', 'senha'],
        where: {
            email: email
        }
    })

    if (usuario === null) {
        return res.status(404).json({
            mensagem: "Usuário não localizado!"
        });
    }

    if (email == usuario.email && senha == usuario.senha) {
        return res.status(200).json({
            usuario
        });
    } else {
        return res.status(404).json({
            mensagem: "Usuário ou senha inválida!"
        });
    }

});

router.post("/cadastrarUsuarioAPI", async (req, res) => {
    await Usuario.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário cadastrado com sucesso!"
            });
        }
        ).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Falha ao cadastrar usuário!"
            });
        });
});

router.post("/cadastrarUsuario", async (req, res) => {
    console.log(req.body);
    await Usuario.create(req.body)
        .then(() => {
            document.getElementById("popup_cadastrar_usuario").style.display = 'none';
            res.redirect('/');
        }).catch(() => {
            res.sendFile(path.join(__dirname, "../../paginas", "index.html"));
        });
});

router.get("/principal", (req, res) => {
    res.sendFile(path.join(__dirname, "../../paginas", "principal.html"));
});

router.get("/tabelaUsuario", async (req, res) => {
    const dados = await Usuario.findAll();
    res.json(dados);
});

router.get("/editarUsuario/:id", async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = await Usuario.findByPk(usuarioId);

        const usuarioSessao = req.session.usuario;
        console.log(usuarioSessao.nome);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado!",
            });
        }

        res.render('editarUsuario', { usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro interno do servidor",
        });
    }
});

router.post("/alterarUsuario/:id", async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioAtualizado = req.body;

        await Usuario.update(usuarioAtualizado, {
            where: { id: usuarioId },
        });

        res.redirect("/principal");
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            erro: true,
            mensagem: "Falha ao alterar usuário!",
        });
    }
});

//PADRÃO SINGLETON
module.exports = router;