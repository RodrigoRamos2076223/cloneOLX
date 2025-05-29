const express = require("express");
const router = express.Router();
const pesquisaController = require("../controllers/pesquisa_guardada.controller");

// Frontoffice - pesquisas guardadas
router.post("/criar", pesquisaController.autenticarJWT, pesquisaController.salvarPesquisa);
router.get("/minhas", pesquisaController.autenticarJWT, pesquisaController.listarPesquisas);
router.get("/executar/:id", pesquisaController.autenticarJWT, pesquisaController.executarPesquisa);
router.delete("/:id", pesquisaController.autenticarJWT, pesquisaController.apagarPesquisa);

// Backoffice admin - pesquisas guardadas
router.get("/", pesquisaController.listarTodasPesquisas);
router.put("/:id", pesquisaController.editarPesquisa);
router.delete("/admin/:id", pesquisaController.excluirPesquisa);

module.exports = router; 