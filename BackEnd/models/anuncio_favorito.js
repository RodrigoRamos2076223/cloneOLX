const { DATE } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const AnuncioFavorito = sequelize.define(
    "AnuncioFavorito",
    {
      id_utilizador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "utilizador",
          key: "id_utilizador",
        },
      },
      id_anuncio: {
        //FOREIGN KEY (id_anuncio) REFERENCES anuncio(id_anuncio)
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "anuncio",
          key: "id_anuncio",
        },
      },
      data_adicao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      tableName: "anuncio_favorito",
      timestamps: false,
    }
  );
  return AnuncioFavorito;
};
