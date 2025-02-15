const express = require("express");
const router = express.Router();
const Joi = require("joi");

const books = [
  {
    id: 1,
    title: "Black Swan",
    author: "Nasim Taleb",
    description: "About Black Swan",
    price: 10,
    cover: "soft cover",
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    description: "About Rich Dad Poor Dad",
    price: 12,
    cover: "soft cover",
  },
];

/**
 * @desc    Get all books
 * @route   /books
 * @method  GET
 * @access  public
 */

router.get("/", (req, res) => {
  res.status(200).json(books);
});

/**
 * @desc    Get book by id
 * @route   /books/:id
 * @method  GET
 * @access public
 */

router.get("/:id", (req, res) => {
  const book = books.find((aBook) => aBook.id === parseInt(req.params.id));

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "not found" });
  }
});

/**
 * @desc    Add new book
 * @route   /books
 * @method  POST
 * @access  public
 */

router.post("/", (req, res) => {
  const { error } = validateCreateBook(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };

  books.push(book);
  res.status(201).json(book);
});

/**
 * @desc    Update a book
 * @route   /books/:id
 * @method  UPDATE
 * @access  public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = books.find((aBook) => aBook.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json({ message: "Book has been updated" });
  } else {
    res.status(404).json({ message: "Book not found!" });
  }
});

/**
 * @desc    Delete a book
 * @route   /books/:id
 * @method  DELETE
 * @access  public
 */

router.delete("/:id", (req, res) => {
  const book = books.find((aBook) => aBook.id === parseInt(req.params.id));
  if (book) {
    res.json({ message: "book has been deleted" });
  } else {
    res.json({ message: "book not found!" });
  }
});

//! You have to validate every single UPDATE or POST you handle

// Validate Create a Book

function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(3).required().trim(),
    author: Joi.string().min(3).required().trim(),
    description: Joi.string().trim(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim(),
  });

  return schema.validate(obj);
}

// Validate Update a Book

function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(3).trim(),
    author: Joi.string().min(3).trim(),
    description: Joi.string().trim(),
    price: Joi.number().min(0),
    cover: Joi.string().trim(),
  });

  return schema.validate(obj);
}

module.exports = router;
