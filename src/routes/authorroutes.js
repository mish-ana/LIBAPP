const express = require('express');
const authorRouter = express.Router();

var author = [{

        author: 'joseph barbera',
        genre: 'comedy',
        img: "tom.jpg"

    }, {

        author: 'joseph barbera',
        genre: 'comedy',
        img: "tom.jpg"
    },
    {
        author: 'joseph barbera',
        genre: 'comedy',
        img: "tom.jpg"
    }

]



authorRouter.get('/', function(req, res) {
    res.render("author", {
        author
    });
});


module.exports = authorRouter;