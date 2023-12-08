const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const { DATE } = require("sequelize");
const nodemailer = require('nodemailer');
const User = db.users;

const transport = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'SuporteNote2Note@outlook.com',
    pass: 'Supnote2',
  }
});

const sendWelcomeEmail = (email) => {
  transport.sendMail({
    from: 'Suporte Note2Note <SuporteNote2Note@outlook.com>',
    to: email,
    subject: 'Bem-Vindo',
    html: '<h1>Seja Bem-Vindo ao Note2Note!</h1> <h3>Saudações </h3><p>É uma satisfação receber você como um novo usuário do Note2Note. Esperamos que desfrute ao máximo de sua experiência conosco e que encontre valor em nossa plataforma.</p><br><p>Atenciosamente, Equipe do Note2Note</p>',
    text: 'Equipe Note2Note',
  })
  .then(() => console.log('Email enviado com sucesso para', email))
  .catch((err) => console.log('Erro ao enviar o email', err));
};

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const newEmail = req.body.email;

    const existingUser = await User.findOne({ where: { email: newEmail } });

    if (existingUser) {
      return res.status(409).send("Email already exists in the database.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      userName,
      email,
      password: hashedPassword,
    };

    const user = await User.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

      // Send welcome email after user creation
      sendWelcomeEmail(email);

      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
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
      return res.status(412).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try{
    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true});
    return res.status(200).send("User logged out successfully")
  } catch (error){
    console.log(error);
  }
}

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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_RESET_SECRET_KEY, {
      expiresIn: '1h', 
    });

    transport.sendMail({
      from: 'Suporte Note2Note <SuporteNote2Note@outlook.com>',
      to: email,
      subject: 'Redefinição de Senha',
      html: `<h1>Caro(a) Sr./Sra.: ${user.userName}</h1>
            <p>Em resposta à sua requisição de redefinição de senha para a sua conta, segue abaixo o código de redefinição correspondente:</p>
            <p style="background-color: #bb9469; color: #fff; padding: 8px 12px; border-radius: 5px;">${resetToken}</p>
            <p>Para efetivar a alteração da sua senha, solicitamos que clique no botão abaixo:</p>
            <a href="http://localhost:8080/users/reset-password" style="display: inline-block; padding: 10px 20px; background-color: #1976d2; color: #fff; text-decoration: none; border-radius: 5px;">Redefinir Senha</a>
            <p>No caso de não ter sido o senhor o autor desta requisição, pedimos gentilmente que desconsidere este comunicado. Ressaltamos a importância de preservar a sua segurança.</p>
            <h3>Atenciosamente, Equipe Note2Note</h3>`,
      text: `Redefinição de Senha: http://localhost:8080/users/reset-password`,
    });

    return res.status(200).send("Email sent with password reset instructions");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token) {
      return res.status(400).send("Invalid token");
    }

    // Verifique se o token é válido
    jwt.verify(token, process.env.JWT_RESET_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }

      const user = await User.findByPk(decodedToken.id);

      if (!user) {
        return res.status(404).send("User not found");
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return res.status(200).send("Password updated successfully");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
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
};