const asyncHandler = require("express-async-handler");
const Book = require("../models/Book");

const getBooks = asyncHandler(async (req,res) => {
    const page = req.query.page || 0;
    const name = req.query.title || ""
    const booksPerPage = 10;

    const books = await Book.find({title:{$regex:name, $options: 'i'}}).sort({title: 1}).skip(page * booksPerPage).limit(booksPerPage).populate(["authors",'categories','publisher']);
    const totalBooks = await Book.find({title:{$regex:name, $options: 'i'}}).count();
    res.status(200).json({books, totalBooks})
})

const getBook = asyncHandler(async (req,res) => {
    const isbn = req.params.isbn || "";
    const book = await Book.findOne({ISBN10:isbn}).populate(["authors",'categories','publisher']);
    if(!book) {
        res.status(400)
        throw new Error("No book found with that ISBN")
    }
    res.status(200).json({book})
})

module.exports = {
    getBooks,
    getBook
}