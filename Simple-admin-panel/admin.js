////////////////////////////// Entry point setup///////////////////////
var express = require('express');
var mongoose = require('mongoose')
var session = require('express-session')
var bodyParser = require('body-parser')
 
var app = express();

app.use(bodyParser.urlencoded({extended: true}))
// Set up port
var port = process.env.port || 8000

// Config DB and schema
var Profile = require('./models/user')
var db_connection = require('./config/db'); 
const { static } = require('express');

// view engine setup
app.set('view engine', 'ejs');

app.use(express.static('views'))

//////////////////////////// Routes sesction ///////////////////////
app.get('/', (req, res) => {
    res.redirect('/index')
})



/////////////////////////Server listen ////////////////////////////
const server = app.listen(port, () => {
    console.log('http://localhost:' + port)
})