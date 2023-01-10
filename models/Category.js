const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: String,
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Book"
    }]
})

module.exports = mongoose.model("Category", categorySchema)