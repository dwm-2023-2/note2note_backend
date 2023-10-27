const express = require("express");
const registroDiarioController = require("../Controllers/registroDiarioController");
const {
  createRegistroDiario,
  findAllRegsDiario,
  findRegsDiario,
  updateRegsDiario,
  deleteRegsDiario,
} = registroDiarioController;
const router = express.Router();

router.post("/registroDiario", createRegistroDiario);
router.get("/registroDiario", findAllRegsDiario);
router.get("/registroDiario/:id", findRegsDiario);
router.put("/registroDiario/:id", updateRegsDiario);
router.delete("/registroDiario/:id", deleteRegsDiario);

module.exports = router;
