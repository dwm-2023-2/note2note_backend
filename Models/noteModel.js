module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "notes",
    {
      noteName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noteContent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noteImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
  return Note;
};
