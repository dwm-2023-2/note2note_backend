const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const Diario = db.diarios;

const createDiarios = async (req, res) => {
  try {
    const { diarioNome, diarioDescricao, privacidade, userId } = req.body;
    const data = {
      diarioNome,
      diarioDescricao,
      privacidade,
      userId,
    };
    const diario = await Diario.create(data);
    if (diario) {
      return res.status(201).send(diario);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

const findAllDiarios = async (userId, res) => {
  try {
    const diarios = await Diario.findAll({
      where: { userId: userId }
    });

    if (!diarios) {
      return res.status(404).send({
        message: 'No diaries found for this user.'
      });
    }

    res.send(diarios);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error retrieving diaries for the user.'
    });
  }
};

const findDiarios = async (req, res) => {
  try {
    const id = req.params.id;

    Diario.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Unable to find journal with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving journal with id=" + id,
        });
      });
  } catch (error){
    console.log(error);
  }
};

const updateDiario = async (req, res) => {
  const id = req.params.id;

  Diario.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Diario was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Diario with id=${id}. Maybe Diario was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Diario with id=" + id,
      });
    });
};

const deleteDiario = async (req, res) => {
  try {
    const id = req.params.id;

    Diario.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Diario was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Diario with id=${id}. Maybe Diario was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Diario with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createDiarios,
  findAllDiarios,
  findDiarios,
  updateDiario,
  deleteDiario,
};
