const express = require("express");
const compartilhamentoController = require ("../Controllers/compartilhamentoController")
const { createCompartilharDiario, findAllcompartDiario, findcompartDiario, updatecompartDiario, deletecompartDiario, } = compartilhamentoController;
const router = express.Router();

router.post("/CompartilharDiario", createCompartilharDiario);
router.get("/CompartilharDiario", findAllcompartDiario);
router.get("/CompartilharDiario/:id", findcompartDiario);
router.put("/CompartilharDiario/:id", updatecompartDiario);
router.delete("/CompartilharDiario/:id", deletecompartDiario);

module.exports = router