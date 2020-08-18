const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User");

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Obtém usuário por email
      const user = await User.findOne({ email });

      // Corresponder a senha
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) throw error;
        if (isMatch) {
          resolve(user);
        } else {
          reject("Authentication Failed");
        }
      });
    } catch (error) {
      // Email não encontrado
      reject("Authentication Failed");
    }
  });
};
