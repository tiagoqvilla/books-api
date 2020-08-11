const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Retorna todos os posts
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// Retorna um livro específico
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// Cadastra um novo livro
router.post("/", async (req, res) => {
  const { title, author, isbn, genre, date_published, date_posted } = req.body;

  const book = new Book({
    title,
    author,
    isbn,
    genre,
    date_published,
    date_posted,
  });

  try {
    const bookPost = await book.save();
    res.status(201).json(bookPost);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// Atualiza um livro
router.put("/:id", async (req, res) => {
  try {
    const bookUpdate = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(201).json(bookUpdate);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// Delete um livro
router.delete("/:id", async (req, res) => {
  try {
    const bookDelete = await Book.findByIdAndRemove(req.params.id);
    res
      .status(200)
      .json({ msg: `Post de id ${req.params.id} removido com sucesso!` });
  } catch (error) {
    res.status;
  }
});

module.exports = router;
