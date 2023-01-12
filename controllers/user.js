const asyncHandler = require("express-async-handler");
const Book = require("../models/Book");
const Bookshelf = require("../models/Bookshelf");
const User = require("../models/User");
const UserBook = require('../models/UserBooks');

const getUser = asyncHandler(async (req,res) => {
    return res.status(200).json({user:req.user})
 })

const getUserShelves = asyncHandler(async (req,res) => {
    let shelves = await Bookshelf.find({user: req.user}).populate([{path: 'books', populate: ["book"]}])
    return res.status(200).json({shelves})
 })

 const getUserShelf = asyncHandler(async (req,res) => {
    let shelf = await Bookshelf.find({user: req.user, _id: req.params.id}).populate([{path: 'books', populate: ["book"]}])
    return res.status(200).json({shelf})
 })


const createUserShelf = asyncHandler(async (req,res) => {
    const name = req.body.name;
    if(!name){
     res.status(400)
     throw new Error("BookShelf needs a name")
    }
    let shelf = await Bookshelf.find({user: req.user, name: req.body.name})
    if(shelf.length > 0) {
         res.status(400)
         throw new Error("BookShelf needs a unique name")
    }
    shelf = await Bookshelf.create({user: req.user, name: req.body.name});
    shelf.user = undefined;
    res.status(201).json({shelf})
 })
 
 const deleteUserShelf = asyncHandler(async (req,res) => {
     const id = req.params.id;
     if(!id){
         res.status(400)
         throw new Error("BookShelf needs a name")
    }
    const deleted = await Bookshelf.deleteOne({user: req.user, _id: id})
    res.status(200).json({deleted})
 })

 const getUserBook = asyncHandler(async (req,res) => {
    const book = await Book.findOne({ISBN10: req.params.id})
    const userBook = await UserBook.find({user: req.user, book}).populate(['book'])
    res.status(200).json({userBook})
})

const getUserBooks = asyncHandler(async (req,res) => {
    const books = await UserBook.find({user: req.user}).populate([{path: 'book', populate: ["authors"]}])
    res.status(200).json({books})
})

const addBookToUserBooks = asyncHandler(async (req,res) => {
   const book_id = req.body.book_id;
   const book = await Book.findOne({_id: book_id});
   if(!book){
    res.status(400)
    throw new Error("No Book Found with that ID")
   }
   let userBook = await UserBook.find({user: req.user, book});
   if(userBook.length > 0) {
    res.status(400)
    throw new Error("Book already in collection")
   }
   userBook = await UserBook.create({user: req.user, book: book, status: req.body.status || "planned"});
   userBook.user = undefined;
   res.status(200).json({userBook});

})

const removeUserBook = asyncHandler(async (req,res) => {
    const id = req.params.id;
     if(!id){
         res.status(400)
         throw new Error("No ID for UserBook to remove")
    }
    const deleted = await UserBook.deleteOne({user: req.user, _id: id})
    res.status(200).json({deleted})
})

const editUserBook = asyncHandler(async (req,res) => {
    const id = req.params.id;
    if(!id){
        res.status(400)
        throw new Error("No ID for UserBook to edit")
   }
   if(!["planned", "reading", "finished"].includes(req.body.status)){
    res.status(400)
    throw new Error("No Valid Status provided")
   }
   const book = await UserBook.updateOne({user: req.user, _id: id}, {status: req.body.status}).populate(["book"]);
   res.status(200).json({book})
})

const addBookToShelf = asyncHandler(async (req,res) => {
    const userBooks = await UserBook.find({_id: {$in: req.body.books}})
    let shelf = await Bookshelf.findById(req.params.id).populate(['books'])
    if(!userBooks.length || !shelf){
        res.status(400)
        throw new Error("No Book or Shelf Found with that ID")
    }
    shelf.books.push(...userBooks)
    await shelf.save();
    shelf = await Bookshelf.findById(req.params.id).populate({path: 'books', populate: ["book"]})
    res.status(200).json({shelf})
})

const removeBookFromShelf = asyncHandler(async (req,res) => {
    let shelf = await Bookshelf.findById(req.params.id).populate(['books'])
    if(!shelf){
        res.status(400)
        throw new Error("No Book or Shelf Found with that ID")
    }
    shelf.books = shelf.books.filter(x => !req.body.books.includes(x._id.toString()))
    shelf.save();
    shelf = await Bookshelf.findById(req.params.id).populate({path: 'books', populate: ["book"]})
    res.status(200).json({shelf})
})


module.exports = { 
    getUserBooks, 
    getUserShelves, 
    addBookToUserBooks, 
    addBookToShelf, 
    editUserBook,
    createUserShelf, 
    deleteUserShelf, 
    removeBookFromShelf,
    removeUserBook,
    getUser,
    getUserBook,
    getUserShelf
 }