const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const { DATE } = require("sequelize");
const User = db.users;

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const newEmail = req.body.email;

    const existingUser = await User.findOne({ where: { email: newEmail } });

    if (existingUser) {
      return res.status(409).send("Email already exists in the database.");
    }

    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //saving the user
    const user = await User.create(data);

    //if user details is captured
    //generate token with the user's id and the JWT_SECRET_KEY in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //if username is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the JWT_SECRET_KEY in the env file

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //send user data
        return res.status(201).send(user);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
    return res.status(200).send("User logged out successfully");
  } catch (error) {
    console.log(error);
  }
};

const findAllUsers = async (req, res) => {
  try {
    User.findAll()
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

const findUser = async (req, res) => {
  try {
    const id = req.params.id;

    User.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const updateUserName = async (req, res) => {
  try {
    const id = req.params.id;

    User.update({ userName: req.body.userName }, { where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating User with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    User.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete User with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const updateUserEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const newEmail = req.body.email;

    const existingUser = await User.findOne({ where: { email: newEmail } });

    if (existingUser) {
      return res.status(409).send("Email already exists in the database.");
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.email = newEmail;
    await user.save();

    return res.status(200).send("Email updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  signup,
  login,
  logout,
  findAllUsers,
  findUser,
  updateUserName,
  deleteUser,
  updateUserEmail,
};
