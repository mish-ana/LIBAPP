const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Qwerty2605:Qwerty2605@cluster0.pe6tb.mongodb.net/LIBAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    image: String
});
var bookdata = mongoose.model('bookdata', BookSchema);
module.exports = bookdata;