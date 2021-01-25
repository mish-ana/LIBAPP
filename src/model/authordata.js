const mongoose = require("mongoose");

// connect to cloud Database
mongoose.connect("mongodb+srv://mishana123:mishana123@cluster0.ldswi.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority");

// connect to manually created Database
// mongoose.connect("mongodb://localhost:27017/library");

// create Schema
const Schema = mongoose.Schema;

// define Schema structure for an author
const AuthorSchema = new Schema({
    author: String,
    book: String,
    genre: String,
    image: String,
    about: String
});

// create model
var Authordata = mongoose.model("authordata", AuthorSchema);

// export model
module.exports = Authordata;