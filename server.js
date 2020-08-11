const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

// Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ msg: "Welcome to the Books API!" }));

// Definição das Rotas
const booksRoutes = require("./routes/books");
app.use("/books", booksRoutes);

//Conectar ao DB
mongoose.connect(
  config.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Conectado ao DB")
);

app.listen(config.PORT);
