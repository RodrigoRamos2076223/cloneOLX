const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Localizacao = sequelize.define('Localizacao', {
        id_localizacao: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        distrito: {
          type: DataTypes.STRING(45),
          allowNull: false
        },
        concelho: {
          type: DataTypes.STRING(45),
          allowNull: false
        }
      }, {
        tableName: 'localizacao',
        timestamps: false
      });

      return Localizacao;
}