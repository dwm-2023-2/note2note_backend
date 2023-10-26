const express = require("express");
const diarioController = require("../Controllers/diarioController");
const { createDiarios, findAllDiarios, findDiarios, updateDiario, deleteDiario } =
  diarioController;
const router = express.Router();

router.post("/diario", createDiarios);
router.get("/diario", findAllDiarios);
router.get("/diario/:id", findDiarios);
router.put("/diario/:id", updateDiario);
router.delete("/diario/:id", deleteDiario);

module.exports = router;