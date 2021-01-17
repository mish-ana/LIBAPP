const express = require('express');
const bookRouter = express.Router();
const Bookdata = require('../model/bookdata');

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
    return bookRouter;
}

module.exports = router;