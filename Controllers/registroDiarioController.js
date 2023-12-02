const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const registroDiario = db.registroDiario;

const createRegistroDiario = async (req, res) => {
  try {
    const {tituloRegistro, conteudoRegistro, privacidade, diarioId,} = req.body;
    const data = {
      tituloRegistro,
      conteudoRegistro,
      privacidade,
      diarioId,
    };
    const RegistroDiario = await registroDiario.create(data);
    if (RegistroDiario) {
      return res.status(201).send(RegistroDiario);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};
const findAllRegsDiario = async (diarioId, res) => {
  try {
    const registrosdiarios = await registroDiario.findAll({
      where: { diarioId: diarioId }
    });
    
    if (!registrosdiarios || registrosdiarios.length === 0) {
      return res.status(404).send({
        message: 'No entries found for this diary.'
      });
    }

    res.send(registrosdiarios);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error retrieving records from this diary.'
    });
  }
};

const findRegsDiario = async (req, res) => {
  try {
    const id = req.params.id;

    registroDiario.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Unable to find record with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving record with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const updateRegsDiario = async (req, res) => {
  const id = req.params.id;

  registroDiario
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Registry was updated successfully.",
        });
      } else {
        res.send({
          message: `Unable to update Registry with id=${id}. Maybe the Registry was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Registry with id=" + id,
      });
    });
};

const deleteRegsDiario = async (req, res) => {
  try {
    const id = req.params.id;

    registroDiario
      .destroy({
        where: { id: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Registro wsa deleted successfully!",
          });
        } else {
          res.send({
            message: `It is not possible to delete the Journal Record with id=${id}. Perhaps the Registry was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Unable to delete record with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRegistroDiario,
  findAllRegsDiario,
  findRegsDiario,
  updateRegsDiario,
  deleteRegsDiario,
};
