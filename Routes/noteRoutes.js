const express = require("express");
const noteController = require("../Controllers/noteController");
const { createNote, findAllNotes, findNote, updateNote, deleteNote } =
  noteController;
const router = express.Router();

router.post("/note", createNote);
router.get("/notes", findAllNotes);
router.get("/note/:id", findNote);
router.put("/note/:id", updateNote);
router.delete("/note/:id", deleteNote);

module.exports = router;
