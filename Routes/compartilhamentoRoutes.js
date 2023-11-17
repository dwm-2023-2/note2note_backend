const express = require("express");
const compartilhamentoController = require ("../Controllers/compartilhamentoController")
const { createCompartilharDiario, findAllcompartDiario, findcompartDiario, updatecompartDiario, deletecompartDiario, } = compartilhamentoController;
const router = express.Router();

router.post("/compartilharDiario", createCompartilharDiario);
router.get("/compartilharDiario", findAllcompartDiario);
router.get("/compartilharDiario/:id", findcompartDiario);
router.put("/compartilharDiario/:id", updatecompartDiario);
router.delete("/compartilharDiario/:id", deletecompartDiario);

module.exports = router