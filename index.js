//importing modules
const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./Models");
const userRoutes = require("./Routes/userRoutes");
const diarioRoutes = require("./Routes/diarioRoutes");
const registroDiarioRoutes = require("./Routes/registroDiarioRoutes");
const cors = require("cors");

//setting up your port
const PORT = process.env.PORT;

//assigning the variable app to express
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
  origin: 'nodeport-service',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));



//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
  console.log("db has been re sync");
});

app.get("/", (req, res) => {
  res.send("Note2Note API.");
});

//routes for the user API
app.use("/users", userRoutes);

//routes for the note API
app.use("/diarios", diarioRoutes);

app.use("/registrosdiario", registroDiarioRoutes);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
