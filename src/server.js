//importing modules
const express = require("express");
const sequelize = require("sequelize");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./Models");
const userRoutes = require("./Routes/userRoutes");
const diarioRoutes = require("./Routes/diarioRoutes");
const RegistroDiarioRoutes = require("./Routes/RegistroDiarioRoutes");
const cors = require("cors");



//assigning the variable app to express
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
  console.log("db has been re sync");
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

//routes for the user API
app.use("/users", userRoutes);

//routes for the note API
app.use("/notes", diarioRoutes);

app.use("/router", RegistroDiarioRoutes);

module.exports = app
