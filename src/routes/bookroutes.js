const express = require('express');
const bookRouter = express.Router();
const Bookdata = require('../model/bookdata');

const fs = require("fs");

const upload = require("express-fileupload");
bookRouter.use(upload());

function router(nav) {

    // var books = [{
    //         title: 'tom and jerry',
    //         author: 'joseph barbera',
    //         genre: 'comedy',
    //         img: "tom.jpg"

    //     }, {
    //         title: 'tom and jerry',
    //         author: 'joseph barbera',
    //         genre: 'comedy',
    //         img: "tom.jpg"
    //     },
    //     {
    //         title: 'tom and jerry',
    //         author: 'joseph barbera',
    //         genre: 'comedy',
    //         img: "tom.jpg"
    //     }

    // ] 
    //displaying the existing books in the databse

    bookRouter.get('/', function(req, res) {
        Bookdata.find()
            .then(function(books) {
                res.render("books", {
                    nav,
                    title: 'Library',
                    books
                });
            })

    });

    bookRouter.get('/:id', function(req, res) {
        var id = req.params.id
        Bookdata.findOne({ _id: id })
            .then(function(book) {
                res.render('book', {
                    nav,
                    title: 'BOOK',
                    book
                });
            });

    });
    bookRouter.get("/updateform/:id", (req, res) => {

        // access id of a single book
        const id = req.params.id;

        // find single book in Database
        Bookdata.findOne({ _id: id })
            .then(function(book) {

                res.render("updateBook", {
                    nav,
                    title: "Update a Book",
                    book
                });

            });

    });

    // update a book

    bookRouter.post("/update/:id/:img", (req, res) => {

        // access id & image of a single book
        const id = req.params.id;
        var img = req.params.img;

        // if image is updated
        if (req.files) {

            // remove curent image
            fs.unlink("./public/images/" + img, (err) => {
                if (err) {
                    console.log(err);
                }
            });

            img = req.files.image.name;
            var file = req.files.image;

            // upload image to images-folder
            file.mv("./public/images/" + img, function(err) {
                if (err) {
                    res.send(err);
                }
            });

        }

        // update book details
        Bookdata.updateOne({ _id: id }, {
                $set: {
                    title: req.body.title,
                    author: req.body.author,
                    genre: req.body.genre,
                    image: img,
                    about: req.body.about
                }
            })
            .then(function(book) {
                // updated a book
                console.log('Book updated');
            });

        // update Books page
        res.redirect("/books");

    });

    bookRouter.get("/delete/:id/:img", (req, res) => {

        // access id of single book
        const id = req.params.id;
        var img = req.params.img;

        // find single book in Database
        Bookdata.deleteOne({ _id: id })
            .then(function(book) {
                // deleted one book from Library

                // remove image
                fs.unlink("./public/images/" + img, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });

            });

        // update Books page
        res.redirect("/books");

    });

    return bookRouter;


}



module.exports = router;