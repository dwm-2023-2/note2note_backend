const express = require("express");
const diarioController = require("../Controllers/diarioController");
const { createDiarios, findAllDiarios, findDiarios, updateDiario, deleteDiario } =
  diarioController;
const router = express.Router();

router.post("/note", createDiarios);
router.get("/notes", findAllDiarios);
router.get("/note/:id", findDiarios);
router.put("/note/:id", updateDiario);
router.delete("/note/:id", deleteDiario);

module.exports = router;
