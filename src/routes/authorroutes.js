const express = require('express');
const authorRouter = express.Router();
const fs = require("fs");

const upload = require("express-fileupload");
authorRouter.use(upload());

// import AuthorSchema
const Authordata = require("../model/authordata");

// var author = [{

//         author: 'joseph barbera',
//         genre: 'comedy',
//         img: "tom.jpg"

//     }, {

//         author: 'joseph barbera',
//         genre: 'comedy',
//         img: "tom.jpg"
//     },
//     {
//         author: 'joseph barbera',
//         genre: 'comedy',
//         img: "tom.jpg"
//     }

// ]



authorRouter.get('/', function(req, res) {
    Authordata.find()
        .then(function(author) {
            res.render("author", {
                author
            });
        })

});
authorRouter.get("/updateform/:id", (req, res) => {

    // access id of a single book
    const id = req.params.id;

    // find single book in Database
    Authordata.findOne({ _id: id })
        .then(function(author) {

            res.render("updateauthor", {


                author
            });

        });

});

authorRouter.post("/update/:id/:img", (req, res) => {

    // access id & image of a single author
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

    // update author details
    Authordata.updateOne({ _id: id }, {
            $set: {
                author: req.body.author,
                book: req.body.book,
                genre: req.body.genre,
                image: img,
                about: req.body.about
            }
        })
        .then(function(author) {
            // updated an author
        });

    // update Authors page
    res.redirect("/author");

});



authorRouter.get("/delete/:id/:img", (req, res) => {

    // access id of single book
    const id = req.params.id;
    var img = req.params.img;

    // find single book in Database
    Authordata.deleteOne({ _id: id })
        .then(function(author) {
            // deleted one book from Library

            // remove image
            fs.unlink("./public/images/" + img, (err) => {
                if (err) {
                    console.log(err);
                }
            });

        });

    // update Books page
    res.redirect("/author");

});




module.exports = authorRouter;