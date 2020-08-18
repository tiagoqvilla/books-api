const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const verify = require("../middleware/verifyToken");

// @route     GET /books
// @desc      Retorna todos os livros
// @access     Private
router.get("/", verify, async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// @route     GET /books/:id
// @desc      Retorna um livro específico
// @access     Private
router.get("/:id", verify, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// @route     POST /books
// @desc      Cadastra um novo livro
// @access     Private
router.post("/", verify, async (req, res) => {
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

// @route     PUT /books/:id
// @desc      Atualiza um livro
// @access     Private
router.put("/:id", verify, async (req, res) => {
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

// @route     DELETE /books/:id
// @desc      Remove um livro
// @access     Private
router.delete("/:id", verify, async (req, res) => {
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
