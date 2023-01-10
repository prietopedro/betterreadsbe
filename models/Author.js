const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema({
    name: String,
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Book"
    }]

})

module.exports = mongoose.model("Author", authorSchema)