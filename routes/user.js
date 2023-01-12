const express = require("express");
const { getUserBooks, getUserShelves, addBookToUserBooks, addBookToShelf, editUserBook, createUserShelf, deleteUserShelf, removeBookFromShelf, removeUserBook, getUser, getUserBook,getUserShelf } = require("../controllers/user");
const { authRequired } = require("../middleware/authRequired");

const router = express.Router();

router.use(authRequired)
router.get('/', getUser)
router.get('/shelves', getUserShelves)
router.post('/shelves', createUserShelf);
router.get('/shelves/:id', getUserShelf);
router.delete('/shelves/:id', deleteUserShelf);
router.post('/shelves/:id/book', addBookToShelf);
router.delete("/shelves/:id/book", removeBookFromShelf);

router.get('/books/:id', getUserBook);
router.get('/books', getUserBooks);
router.post('/books', addBookToUserBooks);
router.put('/books/:id', editUserBook);
router.delete('/books/:id', removeUserBook);


module.exports = router;