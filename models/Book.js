const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }],
    average_rating: Number,
    ratings_count: Number,
    ISBN13: String,
    ISBN10: String,
    language: String,
    num_pages: Number,
    // Volume Info
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher"
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher"
    }],
    published_date: Date,
    description: String,
    maturity_rating: String,
    thumbnail: String,
    googleInfo: Boolean

})

module.exports = mongoose.model("Book", bookSchema);