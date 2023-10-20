//user model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  return User;
};
