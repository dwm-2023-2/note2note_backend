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
router.get("/registroDiario/:id", findRegsDiario);
router.put("/registroDiario/:id", updateRegsDiario);
router.delete("/registroDiario/:id", deleteRegsDiario);

router.get("/registrosDiario", (req, res) => {
  const diarioId = req.query.diarioId;

  if (!diarioId){
    return res.status(400).send({
      message: 'diarioId is required in query parameters.'
    });
  }

  findAllRegsDiario(diarioId, res);
});


module.exports = router;
