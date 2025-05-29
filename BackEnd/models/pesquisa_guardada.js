module.exports = (sequelize, DataTypes) => {
  const PesquisaGuardada = sequelize.define(
    "PesquisaGuardada",
    {
      id_pesquisa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_utilizador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "utilizador",
          key: "id_utilizador",
        },
      },
      termo_pesquisa: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      filtros: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      data_pesquisa: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      id_localizacao: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "localizacao",
          key: "id_localizacao",
        },
      }
    },
    {
      tableName: "pesquisa_guardada",
      timestamps: false,
    }
  );
  return PesquisaGuardada;
}; 