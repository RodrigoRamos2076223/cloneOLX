const express = require("express");
const router = express.Router();
const mensagemController = require("../controllers/mensagemController");

// Enviar mensagem
router.post("/enviar", mensagemController.autenticarJWT, mensagemController.enviarMensagem);

// Listar conversas do usuário
router.get("/minhas", mensagemController.autenticarJWT, mensagemController.listarConversas);

// Buscar mensagens de uma conversa específica
router.get("/conversa/:id_anuncio", mensagemController.autenticarJWT, mensagemController.buscarMensagens);

module.exports = router;