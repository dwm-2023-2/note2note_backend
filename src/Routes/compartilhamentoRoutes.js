const express = require("express");
const compartilhamentoController = require ("../Controllers/compartilhamentoController")
const { createCompartilharDiario, findAllcompartDiario, findcompartDiario, updatecompartDiario, deletecompartDiario, } = compartilhamentoController;
const router = express.Router();

router.post("/RegistroDiario", createCompartilharDiario);
router.get("/RegistroDiario", findAllcompartDiario);
router.get("/RegistroDiario/:id", findcompartDiario);
router.put("/RegistroDiario/:id", updatecompartDiario);
router.delete("/RegistroDiario/:id", deletecompartDiario);

module.exports = router