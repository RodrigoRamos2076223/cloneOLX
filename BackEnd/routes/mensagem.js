const express = require("express");
const router = express.Router();
const mensagemController = require("../controllers/mensagemController");
const { autenticarJWT } = require("../middlewares/auth");

// Enviar mensagem
router.post("/enviar", autenticarJWT, mensagemController.enviarMensagem);

// Listar conversas do usuário
router.get("/minhas", autenticarJWT, mensagemController.listarConversas);

// Buscar mensagens de uma conversa específica
router.get("/conversa/:id_anuncio", autenticarJWT, mensagemController.buscarMensagens);

module.exports = router;