const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["planned", "reading", "finished"]
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

module.exports = mongoose.model("UserBook", userBookSchema);