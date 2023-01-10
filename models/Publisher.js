const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: String,
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Book"
    }]
})

module.exports = mongoose.model("Publisher", publisherSchema)