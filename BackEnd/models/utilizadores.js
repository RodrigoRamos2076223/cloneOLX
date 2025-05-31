const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Utilizador = sequelize.define('Utilizador', {
        id_utilizador: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome_utilizador: {
          type: DataTypes.STRING(45),
          allowNull: false
        },
        email_utilizador: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true
        },
        password_utilizador: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        telefone: {
          type: DataTypes.STRING(20),
          allowNull: true
        },
        data_registo: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        estado_conta: {
          type: DataTypes.ENUM('ativo', 'suspenso'),
          defaultValue: 'ativo'
        }
      }, {
        tableName: 'utilizador',
        timestamps: false
      });
      
      return Utilizador;
}