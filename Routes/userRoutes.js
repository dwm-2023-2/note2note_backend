const express = require("express");
const userController = require("../Controllers/userController");
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword, 
  findAllUsers,
  findUser,
  updateUserName,
  deleteUser,
  updateUserEmail,
} = userController;
const userAuth = require("../Middlewares/userAuth");
const router = express.Router();

router.post("/signup", userAuth.saveUser, signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/users", findAllUsers);
router.get("/:id", findUser);
router.put("/:id/updateName", updateUserName);
router.delete("/:id", deleteUser);
router.put("/:id/updateUserEmail", updateUserEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword); 

module.exports = router;
