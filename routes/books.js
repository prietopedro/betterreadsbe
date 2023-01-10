const express = require("express");
const { getBooks, getBook } = require("../controllers/books");

const router = express.Router();

router.get('/', getBooks)
router.get('/:isbn', getBook)

module.exports = router;