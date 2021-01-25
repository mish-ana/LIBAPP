const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mishana123:mishana123@cluster0.ldswi.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const BookSchema = new Schema({

    title: String,
    author: String,
    genre: String,
    image: String
});

var bookdata = mongoose.model('bookdata', BookSchema);
module.exports = bookdata;