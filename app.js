const express = require("express");
const Joi = require("joi");
const port = 5000;
const app = express();

//apply middlewares
app.use(express.json());

// app.get();
// app.post();
// app.put();
// app.delete();
console.log('it works!')
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
    title: "Rich DAd Poor Dad",
    author: "Robert Kiyosaki",
    description: "About Rich Dad Poor Dad",
    price: 12,
    cover: "soft cover",
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/books", (req, res) => res.json(books));

app.get("/books/:id", (req, res) => {
  const book = books.find((aBook) => aBook.id === parseInt(req.params.id));

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "not found" });
  }
});

app.post("/books", (req, res) => {

  const schema = Joi.object({
    title: Joi.string().min(3).required().trim(),
    author: Joi.string().min(3).required().trim(),
    description: Joi.string().trim(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({message: error.details[0].message })
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

// running the server

app.listen(port);
