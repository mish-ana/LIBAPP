const express = require('express');
const signupRouter = express.Router();
const bodyParser = require('body-parser');
let alert = require('alert');
const { check, validationResult } = require('express-validator')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

signupRouter.get('/', function(req, res) {
    res.render("signup");
})
signupRouter.post('/register', urlencodedParser, [
    check('username', 'This username must me 3+ characters long')
    .exists()
    .isLength({ min: 3 }),
    check('email', 'Email is not valid')
    .isEmail()
    .normalizeEmail(),

    check(
        "password1",
        "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",
    )
    .isLength({ min: 8 })
    .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
    )

], (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('signup', {
            alert
        })
    } else if (req.body.password != req.body.password1) { // to access the input value from form .. we use req.body.name 

        // res.send("password entered doesnt match");
        alert("password entered dosent match try again");

    } else {
        // res.redirect('/admin');
        res.send('created account');
    }

})


module.exports = signupRouter;