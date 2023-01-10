const asyncHandler = require("express-async-handler");
const Book = require("../models/Book");

const getBooks = asyncHandler(async (req,res) => {
    const page = req.query.page || 0;
    const name = req.query.title || ""
    const booksPerPage = 10;

    const books = await Book.find({title:{$regex:name, $options: 'i'}}).sort({title: 1}).skip(page * booksPerPage).limit(booksPerPage).populate(["authors",'categories','publisher']);
    res.status(200).json({books})
})

module.exports = {
    getBooks
}