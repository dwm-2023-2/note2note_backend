module.exports = (sequelize, DataTypes) => {
  const Diario = sequelize.define(
    "diarios",
    {
      diarioNome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diarioDescricao: {
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
  return Diario;
};
