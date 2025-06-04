const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:password@localhost:3306/cloneolx');

// Import models
const User = require("./models/utilizador")(sequelize);
const Anuncio = require("./models/anuncio")(sequelize);
const Categoria = require("./models/categoria")(sequelize);
const Mensagem = require("./models/mensagem")(sequelize);
const Imagem = require("./models/imagem")(sequelize);
const AnuncioFavorito = require("./models/anuncio_favorito")(sequelize);
const Localizacao = require("./models/localizacao")(sequelize);
const PesquisaGuardada = require("./models/pesquisa_guardada")(sequelize);
const HistoricoVisualizacao = require("./models/historico_visualizacao")(sequelize);

// Definir relacionamentos

// Relacionamentos do Usuário
User.hasMany(Anuncio, { foreignKey: 'id_utilizador' });
Anuncio.belongsTo(User, { foreignKey: 'id_utilizador' });

User.hasMany(AnuncioFavorito, { foreignKey: 'id_utilizador' });
AnuncioFavorito.belongsTo(User, { foreignKey: 'id_utilizador' });

User.hasMany(PesquisaGuardada, { foreignKey: 'id_utilizador' });
PesquisaGuardada.belongsTo(User, { foreignKey: 'id_utilizador' });

User.hasMany(HistoricoVisualizacao, { foreignKey: 'id_utilizador' });
HistoricoVisualizacao.belongsTo(User, { foreignKey: 'id_utilizador' });

// Relacionamentos de Mensagens
User.hasMany(Mensagem, { as: 'mensagensEnviadas', foreignKey: 'id_remetente' });
User.hasMany(Mensagem, { as: 'mensagensRecebidas', foreignKey: 'id_destinatario' });
Mensagem.belongsTo(User, { as: 'remetente', foreignKey: 'id_remetente' });
Mensagem.belongsTo(User, { as: 'destinatario', foreignKey: 'id_destinatario' });
Mensagem.belongsTo(Anuncio, { foreignKey: 'id_anuncio' });

// Relacionamentos do Anúncio
Anuncio.hasMany(Imagem, { foreignKey: 'id_anuncio' });
Imagem.belongsTo(Anuncio, { foreignKey: 'id_anuncio' });

Anuncio.hasMany(AnuncioFavorito, { foreignKey: 'id_anuncio' });
AnuncioFavorito.belongsTo(Anuncio, { foreignKey: 'id_anuncio' });

Anuncio.hasMany(HistoricoVisualizacao, { foreignKey: 'id_anuncio' });
HistoricoVisualizacao.belongsTo(Anuncio, { foreignKey: 'id_anuncio' });

Anuncio.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Categoria.hasMany(Anuncio, { foreignKey: 'id_categoria' });

Anuncio.belongsTo(Localizacao, { foreignKey: 'id_localizacao' });
Localizacao.hasMany(Anuncio, { foreignKey: 'id_localizacao' });

// Sincronizar o banco de dados e criar alguns dados iniciais
(async () => {
    try {
        await sequelize.sync({ force: true });

        // Criar algumas categorias iniciais
        const categorias = await Categoria.bulkCreate([
            { nome: 'Veículos' },
            { nome: 'Imóveis' },
            { nome: 'Eletrônicos' },
            { nome: 'Móveis' },
            { nome: 'Roupas' }
        ]);

        // Criar algumas localizações iniciais
        const localizacoes = await Localizacao.bulkCreate([
            { cidade: 'Funchal', distrito: 'Madeira' },
            { cidade: 'Lisboa', distrito: 'Lisboa' },
            { cidade: 'Porto', distrito: 'Porto' }
        ]);

        // Criar um usuário de teste
        const usuario = await User.create({
            nome: 'Usuário Teste',
            email: 'teste@email.com',
            senha: 'senha123',
            telefone: '912345678'
        });

        // Criar um anúncio de teste
        const anuncio = await Anuncio.create({
            titulo: 'iPhone 13 Pro Max',
            descricao: 'iPhone 13 Pro Max em excelente estado',
            preco: 800,
            id_utilizador: usuario.id,
            id_categoria: categorias[2].id, // Eletrônicos
            id_localizacao: localizacoes[0].id // Funchal
        });

        console.log('Banco de dados sincronizado e dados iniciais criados com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
})();

// Exportar os modelos
module.exports = {
    sequelize,
    User,
    Anuncio,
    Categoria,
    Mensagem,
    Imagem,
    AnuncioFavorito,
    Localizacao,
    PesquisaGuardada,
    HistoricoVisualizacao
};