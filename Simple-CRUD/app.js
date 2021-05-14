////////////////////////////// Entry point setup///////////////////////
var express = require('express');
var mongoose = require('mongoose')

var app = express();

// Set up port
var port = process.env.port || 8000

// Config DB and schema
var User = require('./models/user')
var db_connection = require('./config/db') 

// view engine setup
app.set('view engine', 'ejs');

//////////////////////////////Routes definition//////////////////////
app.get('/', (req, res) => {
  res.redirect('/index')
})

app.get('/index', (req, res) => {
  res.render('index')
})

// Initialize variables
const username = 'test_username'
const password = 'test_pass'
var db = mongoose.connection

/////////////////////////////////// Create ////////////////////////////////////
app.post('/create', (req, res) => {

  var new_user = new User({username: username, password: password})

  new_user.save((err, collection) => {
    if(err){
      return res.send(err)
    }
    else{
      res.send(new_user.username + " has been added")
      console.log('create succedded')
    }
  })
})

////////////////////////////// READ /////////////////////////////
app.post('/read', (req, res) => {

  User.find({username: username}, (err, data) => {
    if(err){
      return console.log(err)
    }
    else{
      res.json(data)
      console.log('read succedded')
    }
  })
})

////////////////////////////// UPDATE /////////////////////////////
// https://kb.objectrocket.com/mongo-db/how-to-use-the-mongoose-update-query-in-nodejs-1303
app.post('/update', (req, res) => {

  const filter = { username: username };
  const update_query = { password: 'changed_password' };

  // update function
  User.updateOne(filter, update_query, (err,result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
})

////////////////////////////// DELETE /////////////////////////////
// https://kb.objectrocket.com/mongo-db/how-to-delete-documents-with-mongoose-235
app.post('/delete', (req, res) => {

  const filter = { username: username };

  User.findOneAndDelete(filter, (err) => {
    if(err) res.json(err);
    res.end("Successful deletion");
  });
})

const server = app.listen(port, () => {
  console.log('http://localhost:' + port)
})