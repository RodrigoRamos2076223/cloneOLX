const PesquisaGuardada = require('../db_sequelize').PesquisaGuardada;
const { sequelize, Anuncio } = require('../db_sequelize');
const { Op } = require('sequelize');
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

// Listar todas as pesquisas guardadas de um utilizador
async function listarPesquisasGuardadas(req, res) {
  const { id_utilizador } = req.params;
  try {
    const pesquisas = await PesquisaGuardada.findAll({
      where: { id_utilizador }
    });
    res.status(200).json(pesquisas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pesquisas guardadas", error });
  }
}

// Guardar uma nova pesquisa
async function guardarPesquisa(req, res) {
  const { id_utilizador, titulo, filtros, categoria, preco_min, preco_max, localizacao } = req.body;
  try {
    const pesquisa = await PesquisaGuardada.create({
      id_utilizador,
      titulo,
      filtros,
      categoria,
      preco_min,
      preco_max,
      localizacao,
      data_criacao: new Date()
    });
    res.status(201).json({ message: "Pesquisa guardada com sucesso!", pesquisa });
  } catch (error) {
    res.status(500).json({ message: "Erro ao guardar pesquisa", error });
  }
}

// Atualizar uma pesquisa guardada
async function atualizarPesquisaGuardada(req, res) {
  const { id } = req.params;
  const { titulo, filtros, categoria, preco_min, preco_max, localizacao } = req.body;
  try {
    const pesquisa = await PesquisaGuardada.findByPk(id);
    if (!pesquisa) {
      return res.status(404).json({ message: "Pesquisa guardada não encontrada" });
    }

    await pesquisa.update({
      titulo,
      filtros,
      categoria,
      preco_min,
      preco_max,
      localizacao
    });

    res.status(200).json({ message: "Pesquisa atualizada com sucesso!", pesquisa });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar pesquisa", error });
  }
}

// Remover uma pesquisa guardada
async function removerPesquisaGuardada(req, res) {
  const { id } = req.params;
  try {
    const resultado = await PesquisaGuardada.destroy({
      where: { id }
    });
    if (resultado) {
      res.status(200).json({ message: "Pesquisa removida com sucesso!" });
    } else {
      res.status(404).json({ message: "Pesquisa guardada não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover pesquisa", error });
  }
}

// Obter notificações de novos anúncios para uma pesquisa guardada
async function verificarNovosAnuncios(req, res) {
  const { id } = req.params;
  try {
    const pesquisa = await PesquisaGuardada.findByPk(id);
    if (!pesquisa) {
      return res.status(404).json({ message: "Pesquisa guardada não encontrada" });
    }

    // Buscar novos anúncios baseados nos critérios da pesquisa
    const novosAnuncios = await Anuncio.findAll({
      where: {
        categoria: pesquisa.categoria,
        preco: {
          [Op.between]: [pesquisa.preco_min, pesquisa.preco_max]
        },
        localizacao: pesquisa.localizacao,
        data_publicacao: {
          [Op.gt]: pesquisa.ultima_verificacao
        }
      }
    });

    // Atualiza a data da última verificação
    await pesquisa.update({ ultima_verificacao: new Date() });

    res.status(200).json({ novosAnuncios });
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar novos anúncios", error });
  }
}

module.exports = {
  listarPesquisasGuardadas,
  guardarPesquisa,
  atualizarPesquisaGuardada,
  removerPesquisaGuardada,
  verificarNovosAnuncios
}; 