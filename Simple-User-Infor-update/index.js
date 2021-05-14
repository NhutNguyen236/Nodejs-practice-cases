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
var Profile = require('./models/posts')
var db_connection = require('./config/db'); 
const { static } = require('express');

// view engine setup
app.set('view engine', 'ejs');

app.use(express.static('views'))

//////////////////////////// Routes sesction ///////////////////////
app.get('/', (req, res) => {
    res.redirect('/index')
})

app.get('/index', (req, res) => {
    Profile.findOne({_id: '609e4b24d7b31e28f6e156df'}, (err, data) => {
        if(err){
            res.json(err)
        }
        else{
            res.render('index', {username: data.username, firstname: data.firstname, lastname: data.lastname, class: data.class, dean: data.dean})
        }
    })
    
})

app.get('/test', (req, res) => {
    Profile.find({}, (err, data) => {
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
})

app.post('/index', (req, res) => {
    // Get body varis
    const account = req.body

    // Actually we should not change username, but we pretain that we have _id as a session key so we will base on that
    const filter = { _id: '609e4b24d7b31e28f6e156df' };
    // We should get event by Jquery on which input value the user just changed but it is more complex, I will cover it later
    const update_query = { username: account.username, firstname: account.firstname, lastname: account.lastname, class: account.class, dean: account.dean}

    // update function
    Profile.updateOne(filter, update_query, (err,result) => {
        if (err) {
            res.send(err);
        } 
        else {
            res.redirect('/index')
        }
    });
})


/////////////////////////Server listen ////////////////////////////
const server = app.listen(port, () => {
    console.log('http://localhost:' + port)
})