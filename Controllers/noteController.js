const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const Note = db.notes;

const createNote = async (req, res) => {
  try {
    const { noteName, noteContent, noteImage } = req.body;
    const data = {
      noteName,
      noteContent,
      noteImage,
    };
    const note = await Note.create(data);
    if (note) {
      return res.status(201).send(note);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

const findAllNotes = async (req, res) => {
  try {
    Note.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const findNote = async (req, res) => {
  try {
    const id = req.params.id;

    Note.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Note with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Note with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const updateNote = async (req, res) => {
  const id = req.params.id;

  Note.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Note was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Note with id=${id}. Maybe Note was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Note with id=" + id,
      });
    });
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;

    Note.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Note was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Note with id=${id}. Maybe Note was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Note with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNote,
  findAllNotes,
  findNote,
  updateNote,
  deleteNote,
};
