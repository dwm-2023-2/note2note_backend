const diarioModel = require("./diarioModel");
const userModel = require("./userModel");

module.exports = (sequelize, DataTypes) => {
  const registroDiario = sequelize.define(
    "registros",
    {
      tituloRegistro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dataRegistro: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      conteudoRegistro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipoDeMidia: {
        type: DataTypes.ENUM("Texto", "Imagem", "Vídeo", "Outro"),
        allowNull: true,
      },
      arquivoDeMidia: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      privacidade: {
        type: DataTypes.ENUM("Público", "Privado", "Compartilhado"),
        allowNull: false,
      },
      autorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: userModel,
          key: "ID",
        },
      },
      diarioAssociadoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: diarioModel,
          key: "ID",
        },
      },
    },
    { timestamps: true }
  );

  registroDiario.belongsTo(userModel, { foreignKey: "AutorID" });
  registroDiario.belongsTo(diarioModel, { foreignKey: "DiarioAssociadoID" });

  return registroDiario;
};
