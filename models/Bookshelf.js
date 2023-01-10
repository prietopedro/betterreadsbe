const mongoose = require('mongoose');

const bookshelfSchema = new mongoose.Schema({
    name: String,
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserBook"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

module.exports = mongoose.model("Bookshelf", bookshelfSchema);