const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../auth");
const express = require("express");
const router = express();
require("dotenv").config();

// @route     POST /user/register
// @desc      Registra um novo usuário
// @access     Public
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const user = new User({
    email,
    password,
  });

  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(user.password, salt, async (error, hash) => {
      // Hash de senha
      user.password = hash;
      // Salva o usuário
      try {
        const newUser = await user.save();
        res.status(201).json({ msg: "User created" });
      } catch (error) {
        res.status(400).json({ msg: error });
      }
    });
  });
});

// @route     POST /user/auth
// @desc      Autentica o usuário
// @access     Public
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await auth.authenticate(email, password);

    // Cria um JWT
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const { iat, exp } = jwt.decode(token);

    //Resposta do token
    res.header("auth-token", token).send({ iat, exp, token });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

module.exports = router;
