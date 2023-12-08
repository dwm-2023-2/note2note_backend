const express = require("express");
const registroDiarioController = require("../Controllers/registroDiarioController");
const {
  createRegistroDiario,
  findAllRegsDiario,
  findRegsDiario,
  updateRegsDiario,
  deleteRegsDiario,
  findRegsByKeyword,
} = registroDiarioController;
const router = express.Router();

router.post("/registroDiario", createRegistroDiario);
router.get("/registroDiario/:id", findRegsDiario);
router.put("/registroDiario/:id", updateRegsDiario);
router.delete("/registroDiario/:id", deleteRegsDiario);

router.get("/registrosDiario", (req, res) => {
  const diarioId = req.query.diarioId;

  if (!diarioId) {
    return res.status(400).send({
      message: 'diarioId is required in query parameters.'
    });
  }

  const orderBy = req.query.orderBy; // Receber o parâmetro de ordenação

  if (orderBy && (orderBy !== 'date' && orderBy !== 'title')) {
    return res.status(400).send({
      message: 'Invalid orderBy parameter. Use "date" or "title".'
    });
  }

  findAllRegsDiario(diarioId, orderBy, res);
});

// Rota para busca por palavra-chave
router.get("/registrosDiario/search", findRegsByKeyword);

module.exports = router;
