const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const DB_CONNECTION = process.env.DB_CONNECTION;

const app = express();

// Middleware
app.use(cors);
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ msg: "Welcome to the Books API!" }));

// Definição das Rotas
const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/users");
app.use("/user", userRoutes);
app.use("/books", booksRoutes);

//Conectar ao DB
mongoose.connect(
  DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Conectado ao DB")
);

app.listen(PORT);
