////////////////////////////// Entry point setup///////////////////////
var express = require('express')
//var mongoose = require('mongoose')
var session = require("express-session")

var app = express();

// Set up port
var PORT = process.env.PORT || 8080

// // Config DB and schema
// var User = require('./models/user_student')
// var Profile = require('./models/profile')
// var db_connection = require('./config/db') 

//////////////////////////// VIEW ENGINE SETUP //////////////////////////
app.set('view engine', 'ejs')
app.use(express.static("views"))
app.set("trust proxy", 1)

//////////////////////////// ROUTES SETUP ////////////////////////////////
var login = require('./functions/loginVerify')

app.get('/', (req, res) => {
	res.redirect('/login')
})

/**
 * Everything will be rendered on 1 same main page.
 * There are 2 types of user here: 1 - casual user, 2 - VIP user
 */
app.get('/login', (req, res) => {
	if(req.session){
		return res.render('login')
	}
	res.redirect('/index')
})

app.get('/index', (req, res) => {
	if(req.session){
		return res.render('main')
	}
	res.redirect('/login')
})

/////////////////////////// SEVER LISTENER ///////////////////////////
var server = app.listen(PORT, () =>{
    console.log("The server is now running at http://localhost:" + PORT);
})