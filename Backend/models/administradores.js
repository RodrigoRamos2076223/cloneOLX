const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Administrador = sequelize.define('Administrador', {
        id_administrador: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome_administrador: {
          type: DataTypes.STRING(45),
          allowNull: false
        },
        email_administrador: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true
        },
        password_administrador: {
          type: DataTypes.STRING(255),
          allowNull: false
        }
      }, {
        tableName: 'administrador',
        timestamps: false
      });
      
      return Administrador;
}