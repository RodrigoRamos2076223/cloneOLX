const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const HistoricoVisualizacao = sequelize.define('HistoricoVisualizacao', {
        id_visualizacao: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        id_utilizador: {
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
        data_visualizacao: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        }
      }, {
        tableName: 'historico_visualizacao',
        timestamps: false
      });

      return HistoricoVisualizacao;
}