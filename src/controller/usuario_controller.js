const express = require("espress");
const path = require("path");

const spawnSync = require ('child_process');

const router = express.Router();
const conexao = require('../dao/db');
const Usuario = require('../models/usuario');

module.exports = router; 