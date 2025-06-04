const { Mensagem, Anuncio, User } = require('../db_sequelize');
const { Op } = require('sequelize');
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

// Enviar mensagem
async function enviarMensagem(req, res) {
  const { id_destinatario, id_anuncio, conteudo } = req.body;
  const id_remetente = req.user.id; // Pega o ID do usuário autenticado
  
  try {
    const novaMensagem = await Mensagem.create({
      id_remetente,
      id_destinatario,
      id_anuncio,
      conteudo,
    });
    res.status(201).json(novaMensagem);
  } catch (error) {
    res.status(500).json({ message: "Erro ao enviar mensagem", error });
  }
}

// Listar todas as conversas do usuário
async function listarConversas(req, res) {
  const userId = req.user.id;
  try {
    const conversas = await Mensagem.findAll({
      where: {
        [Op.or]: [
          { id_remetente: userId },
          { id_destinatario: userId }
        ]
      },
      include: [
        {
          model: Anuncio,
          attributes: ['titulo']
        },
        {
          model: User,
          as: 'remetente',
          attributes: ['nome']
        },
        {
          model: User,
          as: 'destinatario',
          attributes: ['nome']
        }
      ],
      order: [['data_envio', 'DESC']],
      group: ['id_anuncio']
    });
    res.status(200).json(conversas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar conversas", error });
  }
}

// Buscar mensagens de uma conversa específica
async function buscarMensagens(req, res) {
  const userId = req.user.id;
  const { id_anuncio } = req.params;
  
  try {
    const mensagens = await Mensagem.findAll({
      where: {
        id_anuncio,
        [Op.or]: [
          { id_remetente: userId },
          { id_destinatario: userId }
        ]
      },
      include: [
        {
          model: User,
          as: 'remetente',
          attributes: ['nome']
        },
        {
          model: User,
          as: 'destinatario',
          attributes: ['nome']
        }
      ],
      order: [['data_envio', 'ASC']]
    });
    res.status(200).json(mensagens);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar mensagens", error });
  }
}

module.exports = {
  enviarMensagem,
  listarConversas,
  buscarMensagens
};
