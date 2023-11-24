const express = require("express");
const diarioController = require("../Controllers/diarioController");
const {
  createDiarios,
  findDiarios,
  updateDiario,
  deleteDiario,
  findAllDiarios,
} = diarioController;
const router = express.Router();

router.post("/diario", createDiarios);
router.get("/diario/:id", findDiarios);
router.put("/diario/:id", updateDiario);
router.delete("/diario/:id", deleteDiario);

router.get("/diarios", (req, res) => {
  const userId = req.query.userId; // Obtendo o userId da query

  // Verifique se userId foi passado na query
  if (!userId) {
    return res.status(400).send({
      message: 'UserId is required in the query parameters.'
    });
  }

  // Chame a função findAllDiarios passando userId
  findAllDiarios(userId, res);
});

module.exports = router;
