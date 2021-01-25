const express = require('express');
const addauthor = express.Router();
const Authordata = require('../model/authordata');

const fs = require("fs");

const upload = require("express-fileupload");
addauthor.use(upload());

addauthor.get('/', function(req, res) {
    res.render("addauthor");
})

addauthor.post('/add', function(req, res) {
    var item = {
        author: req.body.author,
        book: req.body.book,
        genre: req.body.genre,
        image: req.body.image,
        about: req.body.about
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

    // pass to AuthorSchema
    var author = Authordata(item);

    // save new author to Database
    author.save();

    // update Authors page
    res.redirect("/author");
})
module.exports = addauthor;