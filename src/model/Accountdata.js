const mongoose = require("mongoose");

// connect to cloud Database
mongoose.connect("mongodb+srv://mishana123:mishana123@cluster0.ldswi.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority");

// connect to manually created Database
// mongoose.connect("mongodb://localhost:27017/library");

// create Schema
const Schema = mongoose.Schema;

// define Schema structure for an user account
const AccountSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String
});

// create model
var Accountdata = mongoose.model("accountdata", AccountSchema);

// export model
module.exports = Accountdata;