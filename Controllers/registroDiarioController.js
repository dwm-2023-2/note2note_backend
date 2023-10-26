const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const registroDiario = db.notes;

const createRegistroDiario = async (req, res) => {
  try {
    const {
      tituloRegistro,
      dataRegistro,
      conteudoRegistro,
      tipoDeMidia,
      arquivoDeMidia,
      privacidade,
      autorID,
      diarioAssociadoID,
    } = req.body;
    const data = {
      tituloRegistro,
      dataRegistro,
      conteudoRegistro,
      tipoDeMidia,
      arquivoDeMidia,
      privacidade,
      autorID,
      diarioAssociadoID,
    };
    const regsDiario = await registroDiario.create(data);
    if (regsDiario) {
      return res.status(201).send(regsDiario);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};
const findAllRegsDiario = async (req, res) => {
  try {
    registroDiario
      .findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "An error occurred while retrieving registered journals",
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const findRegsDiario = async (req, res) => {
  try {
    const id = req.params.id;

    registroDiario
      .findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Registry with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Registry with id=" + id,
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
