const express = require("express");
const savedNoteController = require("../Controllers/savedNoteController");
const { createSavedNote, findAllSavedNotes, deleteSavedNote } =
  savedNoteController;
const router = express.Router();

router.post("/savednote", createSavedNote);
router.get("/savednotes", findAllSavedNotes);
router.delete("/savednote/:id", deleteSavedNote);

module.exports = router;
