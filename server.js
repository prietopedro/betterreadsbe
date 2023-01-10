const express = require("express")
const _ = require("dotenv").config();
const expressSession = require("express-session")

const connectDB = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")
require("./models/Author")
require("./models/Book")
require("./models/Category")
require("./models/Publisher")

connectDB();
const port = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(expressSession({
    name: "br-s",
    resave: false,
    secret: "secret, trust me!",
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV || "development",
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//ROUTES
app.use('/api/books', require("./routes/books.js"))
app.use('/api/auth', require("./routes/auth.js"))

//ERROR FALLBACK
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))