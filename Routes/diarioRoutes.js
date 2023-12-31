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
  const userId = req.query.userId; 

  if (!userId) {
    return res.status(400).send({
      message: 'UserId is required in the query parameters.'
    });
  }

  findAllDiarios(userId, res);
});

module.exports = router;
