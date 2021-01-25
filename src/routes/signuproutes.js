const express = require('express');
const signupRouter = express.Router();
const bodyParser = require('body-parser');
const alert = require('alert');
const { check, validationResult } = require('express-validator')
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Accountdata = require("../model/Accountdata");

signupRouter.get('/', function(req, res) {
        res.render("signup");
    })
    // signupRouter.post('/register', urlencodedParser, [
    //     check('username', 'This username must me 3+ characters long')
    //     .exists()
    //     .isLength({ min: 3 }),
    //     check('email', 'Email is not valid')
    //     .isEmail()
    //     .normalizeEmail(),

//     check(
//         "password1",
//         "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",
//     )
//     .isLength({ min: 8 })
//     .matches(
//         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
//     )

// ], (req, res) => {

//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         // return res.status(422).jsonp(errors.array())
//         const alert = errors.array()
//         res.render('signup', {
//             alert
//         })
//     } else if (req.body.password != req.body.password1) { // to access the input value from form .. we use req.body.name 

//         // res.send("password entered doesnt match");
//         alert("password entered dosent match try again");

//     } else {
//         // res.redirect('/admin');
//         res.send('created account');
//     }

// })

// add an account
signupRouter.post("/register", (req, res) => {

    var password = req.body.password;
    var email = req.body.email;
    var regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9]{3,5})+.([a-zA-Z0-9]{3,5})$/

    // email format validation
    if (regexp.test(email)) {
        // valid email

        // password format validation
        if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g) && password.length >= 8) {
            // valid password

            // new account
            var accnt = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }

            // pass to AccountSchema
            var account = Accountdata(accnt);

            // save new account to Database
            account.save();

            // redirect to Loginform page
            res.redirect("/login");

            alert("Your account is ready. You can LogIn now !");

        } else {
            // invalid password
            alert("Password must contain minimum 8 characters including atleast one lowercase,one uppercase,one digit and one special character");
        }

    } else {
        // invalid email
        alert("Invalid Email! (eg:- abcd@gmail.com)");
    }

});


module.exports = signupRouter;