module.exports = (sequelize, DataTypes) => {
    const Imagem = sequelize.define('Imagem', {
        id_imagem: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        caminho_ficheiro: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        id_anuncio: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "anuncio",
            key: "id_anuncio"
        }
        }
      }, {
        tableName: 'imagem',
        timestamps: false
      });

      return Imagem;
}