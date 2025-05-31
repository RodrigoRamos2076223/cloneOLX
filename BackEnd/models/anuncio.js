const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Anuncio = sequelize.define('Anuncio', {
        id_anuncio: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        titulo: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        descricao: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        preco: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        data_publicacao: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        estado: {
          type: DataTypes.ENUM('ativo', 'inativo', 'vendido'),
          defaultValue: 'ativo'
        },
        id_utilizador: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "utilizador",
            key: "id_utilizador"
        }
        },
        id_categoria: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "categoria",
            key: "id_categoria"
        }
        },
        id_localizacao: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "localizacao",
            key: "id_localizacao"
        }
        }
      }, {
        tableName: 'anuncio',
        timestamps: false
      });

      return Anuncio;
}