const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const saved_notes = db.notes;

const createSavedNote = async (req, res) => {
  try {
    const { noteId, userId } = req.body;
    const data = {
      noteId,
      userId,
    };
    const savNote = await saved_notes.create(data);
    if (savNote) {
      return res.status(201).send(savNote);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

const findAllSavedNotes = async (req, res) => {
  try {
    saved_notes
      .findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving saved notes.",
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteSavedNote = async (req, res) => {
  try {
    const id = req.params.id;

    saved_notes
      .destroy({
        where: { id: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "saved notes was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete saved notes with id=${id}. Maybe saved notes was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete saved notes with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createSavedNote,
  findAllSavedNotes,
  deleteSavedNote,
};
