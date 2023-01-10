const express = require("express");
const { getUserBooks, getUserShelves, addBookToUserBooks, addBookToShelf, editUserBook, createUserShelf, deleteUserShelf, removeBookFromShelf, removeUserBook } = require("../controllers/user");
const { authRequired } = require("../middleware/authRequired");

const router = express.Router();

router.use(authRequired)
router.get('/shelves', getUserShelves)
router.post('/shelves', createUserShelf);
router.delete('/shelves/:id', deleteUserShelf);
router.post('/shelves/:id/book', addBookToShelf);
router.delete("/shelves/:id/book/:userBookID", removeBookFromShelf);


router.get('/books', getUserBooks);
router.post('/books', addBookToUserBooks);
router.put('/books/:id', editUserBook);
router.delete('/books/:id', removeUserBook);


module.exports = router;