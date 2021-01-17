const express = require('express');
const loginRouter = express.Router();



loginRouter.get('/', function(req, res) {
    res.render("login");
})

module.exports = loginRouter;