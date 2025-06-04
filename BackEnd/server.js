var dotenv = require('dotenv');
dotenv.config();
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const { Server } = require("socket.io");
const http = require("http");

// Importar rotas
const anuncioRouter = require('./routes/anuncio');
const utilizadorRouter = require('./routes/utilizador');
const anuncioFavoritoRouter = require('./routes/anuncio_favorito');
const imagemRouter = require('./routes/imagem');
const mensagemRouter = require('./routes/mensagem');
const categoriaRouter = require('./routes/categoria');
const localizacaoRouter = require('./routes/localizacao');
const adminRouter = require('./routes/admin');
const pesquisaGuardadaRouter = require('./routes/pesquisa_guardada');

var app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  credentials: true
}));

// Configuração do servidor HTTP e Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

// Armazenar usuários online
const usuariosOnline = new Map();

// Recebe mensagem do cliente e retransmite para o destinatário
socket.on("chat:send", (data) => {
  // data deve conter: { id_remetente, id_destinatario, id_anuncio, conteudo }
  io.emit(`chat:receive:${data.id_destinatario}`, data); // envia para o destinatário
});

socket.on("disconnect", () => {
  console.log("Usuário desconectado:", socket.id);
});

// Rotas API
app.use("/api/anuncio", anuncioRouter);
app.use("/api/utilizador", utilizadorRouter);
app.use("/api/anuncio-favorito", anuncioFavoritoRouter);
app.use("/api/imagem", imagemRouter);
app.use("/api/mensagem", mensagemRouter);
app.use("/api/categoria", categoriaRouter);
app.use("/api/localizacao", localizacaoRouter);
app.use("/api/admin", adminRouter);
app.use("/api/pesquisa-guardada", pesquisaGuardadaRouter);

// Definir porta
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`http://localhost:${port}.`);
});

module.exports = server;
