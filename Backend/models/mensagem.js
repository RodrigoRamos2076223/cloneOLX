const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Mensagem = sequelize.define('Mensagem', {
        id_mensagem: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        id_remetente: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "utilizador",
            key: "id_utilizador"
        }
        },
        id_destinatario: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "utilizador",
            key: "id_utilizador"
        }
        },
        id_anuncio: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "anuncio",
            key: "id_anuncio"
        }
        },
        conteudo: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        data_envio: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        }
      }, {
        tableName: 'mensagem',
        timestamps: false
      });

      return Mensagem;
}