//importing modules
const { Sequelize, DataTypes } = require("sequelize");

//Database connection with dialect of postgres specifying the database we are using
//database name is discover

const sequelize = new Sequelize(
  "postgres://postgres:Kaju@postgres-db:5432/notedb",
  { dialect: "postgres" }
);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require("./userModel")(sequelize, DataTypes);
db.diarios = require("./diarioModel")(sequelize, DataTypes);
db.saved_notes = require("./savedNoteModel")(sequelize, DataTypes);

db.users.hasMany(db.diarios);

//exporting the module
module.exports = db;
