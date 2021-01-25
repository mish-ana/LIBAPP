const express = require('express');
const adminrouter = express.Router();
const Bookdata = require('../model/bookdata');
const fs = require("fs");

const upload = require("express-fileupload");
adminrouter.use(upload());

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

    if (req.files) {

        var file = req.files.image;
        var filename = req.files.image.name;

        // upload image to images-folder
        file.mv("./public/images/" + filename, function(err) {
            if (err) {
                res.send(err);
            }
        });

    }
    var book = Bookdata(item);
    book.save(); // for saving to database
    res.redirect('/books');
})
module.exports = adminrouter;