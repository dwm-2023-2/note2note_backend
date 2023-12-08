const diarioModel = require("./diarioModel");
const userModel = require("./userModel");

module.exports = (sequelize, DataTypes) => {
  const registroDiario = sequelize.define(
    "registroDiario",
    {
      tituloRegistro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      conteudoRegistro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      privacidade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: true }
  );

  return registroDiario;
};
