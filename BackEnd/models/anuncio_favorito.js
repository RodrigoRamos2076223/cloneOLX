const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const AnuncioFavorito = sequelize.define('AnuncioFavorito', {
        id_utilizador: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: "utilizador",
            key: "id_utilizador"
        }
        },
        id_anuncio: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: "anuncio",
            key: "id_anuncio"
        }
        },
        data_adicao: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        }
      }, {
        tableName: 'anuncio_favorito',
        timestamps: false
      });

      return AnuncioFavorito;
}