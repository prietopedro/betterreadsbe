const express = require("express")
const _ = require("dotenv").config();
const cors = require("cors")
const expressSession = require("express-session")

const connectDB = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")
require("./models/Author")
require("./models/Book")
require("./models/Category")
require("./models/Publisher")
require("./models/Bookshelf")
require("./models/User")
require("./models/UserBooks")

connectDB();
const port = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	})
);
app.use(expressSession({
    name: "br-s",
    resave: false,
    secret: "secret, trust me!",
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//ROUTES
app.use('/api/books', require("./routes/books.js"))
app.use('/api/auth', require("./routes/auth.js"))
app.use('/api/user', require("./routes/user.js"))

//ERROR FALLBACK
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))