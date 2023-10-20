const express = require("express");
const RegistroDiarioController = require ("../Controllers/RegistroDiarioController")
const { createRegistroDiario, findAllRegsDiario, findRegsDiario, updateRegsDiario, deleteRegsDiario, } = RegistroDiarioController;
const router = express.Router();

router.post("/RegistroDiario", createRegistroDiario);
router.get("/RegistroDiario", findAllRegsDiario);
router.get("/RegistroDiario/:id", findRegsDiario);
router.put("/RegistroDiario/:id", updateRegsDiario);
router.delete("/RegistroDiario/:id", deleteRegsDiario);

module.exports = router