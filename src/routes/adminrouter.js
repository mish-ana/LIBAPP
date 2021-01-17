const express = require('express');
const adminrouter = express.Router();
const Bookdata = require('../model/bookdata');
adminrouter.get('/', function(req, res) {
    res.render("admin");

})
adminrouter.post('/add', function(req, res) {

    // res.send("done");
    var item = {
        title: req.body.title, // now while using get method use req.query.... for acccesing the content from query
        author: req.body.author,
        genre: req.body.genre,
        image: req.body.image,
    }
    var book = Bookdata(item);
    book.save(); // for saving to database
    res.redirect('/books');
})
module.exports = adminrouter;