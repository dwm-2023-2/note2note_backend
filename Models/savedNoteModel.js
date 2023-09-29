module.exports = (sequelize, DataTypes) => {
  const saved_notes = sequelize.define(
    "saved_notes",
    {},
    { timestamps: false }
  );
  return saved_notes;
};
