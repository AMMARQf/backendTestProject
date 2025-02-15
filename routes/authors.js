const express = require("express");
const router = express.Router();
const Joi = require("joi");

const { Author } = require("../models/Author");

const authors = [
  {
    id: 1,
    firstName: "Naser",
    lastName: "Ahmed",
    nationality: "Lebanon",
    image: "default-image.png",
  },
];

/**
 * @desc    Get all authors
 * @route   /author
 * @method  GET
 * @access  public
 */

router.get("/", (req, res) => res.status(200).json(authors));

/**
 * @desc    Get book by id
 * @route   /author/:id
 * @method  GET
 * @access  public
 */

router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

/**
 * @desc    Get book by id
 * @route   /author/:id
 * @method  GET
 * @access  public
 */

router.post("/", async (req, res) => {
  const { error } = validateCreateAuthor(req.body);

  if (error) {
    return res.status(404).json({ message: error.details[0].message });
  }

  try {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });

    const result = await author.save();

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

/**
 * @desc    Update book by id
 * @route   /author/:id
 * @method  PUT
 * @access  public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(404).json({ message: error.details[0].message });
  }

  const author = authors.find((a) => a.id === parseInt(req.params.id));

  if (author) {
    res.status(200).json({ message: "Author has been updated" });
  } else {
    res.status(404).json({ message: "author not found!" });
  }
});

/**
 * @desc    Delete book by id
 * @route   /author/:id
 * @method  DELETE
 * @access  public
 */

router.delete("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json({ message: "User has been deleted" });
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

// validate create author

function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().required().trim().min(3),
    lastName: Joi.string().required().trim().min(3),
    nationality: Joi.string().min(3).required().trim(),
    image: Joi.string(),
  });

  return schema.validate(obj);
}
// validate update author

function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3),
    lastName: Joi.string().trim().min(3),
    nationality: Joi.string().min(3).trim(),
    image: Joi.string(),
  });

  return schema.validate(obj);
}

module.exports = router;
