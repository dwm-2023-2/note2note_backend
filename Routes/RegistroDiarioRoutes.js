const express = require("express");
const RegistroDiarioController = require ("../Controllers/RegistroDiarioController")
const { createRegistroDiario, findAllRegsDiario, findRegsDiario, updateRegsDiario, deleteRegsDiario, } = RegistroDiarioController;
const router = express.Router();

router.post("/RegistroDiario", createRegistroDiario);
router.post("/RegistroDiario", findAllRegsDiario);
router.post("/RegistroDiario/:id", findRegsDiario);
router.post("/RegistroDiario/:id", updateRegsDiario);
router.delete("/RegistroDiario/:id", deleteRegsDiario);

module.exports = router