const express = require("express");
const mongoose = require("mongoose");
const port = 5000;
const app = express();
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");

mongoose
  .connect("mongodb://localhost/bookStoreDB")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Connection failed to MongoDB!", error));

//apply middlewares
app.use(express.json());

// app.get();
// app.post();
// app.put();
// app.delete();
console.log("it works!");

/**
 * @desc    Get started in the website
 * @route   /
 * @method  GET
 * @access  public
 */

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/books", booksPath);

app.use("/authors", authorsPath);

// running the server

app.listen(port);
