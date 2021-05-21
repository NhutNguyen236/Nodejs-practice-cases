////////////////////////////// Entry point setup///////////////////////
var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var Promise = require('promise')
var async = require('async')
var assert = require('assert')
 
var app = express();

app.use(bodyParser.urlencoded({extended: true}))

// Set up port
var port = process.env.port || 8000

// Config DB and schema
var User = require('./models/user')
var Profile = require('./models/profile')
var db_connection = require('./config/db'); 
const { static } = require('express');

// view engine setup
app.set('view engine', 'ejs');

app.use(express.static('views'))

//////////////////////////// Routes sesction ///////////////////////
app.get('/', (req, res) => {

    res.redirect('/admin')
    
})

app.get('/admin' , (req , res)=>{
    // Add code to check session here
    
     //Collect all users from users collection
     User.find({}, (err, data) => {
        if(err) console.log(err)
        else{

            function numCounter(role){
                var count = 0

                for(i = 0; i < data.length; i++){
                    if(data[i].role == role){
                        count = count + 1
                    }
                }

                return count
            }

            res.render('dashboard',  {numUsers: numCounter(0), numDean: numCounter(1)})
        }
    })

})

// Add Dean page
app.get('/addDean' , (req , res)=>{

    var data_p = []
    // Write code to check session role = 2 - admin or not
    User.find({role: 1}) // async call
    .then(function (data) {
        // Collection id out from data
        var ids = []

        for(i = 0; i < data.length; i++){
            ids.push(data[i]._id)
        }

        // Look and bind displaynames to data_pass
        var data_pass = data

        //  async function findProfilebyID(id){
        //     var query = await Profile.findOne({deanID: id})
        //     return query
        // }

        // for(i = 0; i < data.length; i++){
        //     var query = findProfilebyID(data[i]._id)

        //     query.then(function(result){
        //         displayname.push(result.displayname)
        //         console.log(displayname)
        //     })
        // }

        Profile.find({deanID: ids}).then(function(profile){
            for(i = 0; i < profile.length; i++){
                // Gotta have to define a new field in UserSchema in user model
                data_pass[i].displayname = profile[i].displayname
            }

            res.render('addDean', {data_pass})
        })
        
    });
    // User.find({role: 1}, (err, data) => {
    //     if(err) console.log(err)
    //     else{
    //         var query = Profile.findById(data[0]._id) 
    //     }
    // })
    // Always render page even if there is no data
    //res.render('addDean', {data})
})

app.post('/addDean' , (req , res)=>{
    var body = req.body

    // Create in Users firts 
    var new_user = new User({username: body.username, password: body.password, role: 1})
    // Save new_user to Users first
    new_user.save()
    
    var new_profile = new Profile({deanID: new_user._id, displayname: body.displayname})
    
    new_profile.save()

    res.redirect('/admin')
})

// Student Manage route
app.get('/studentManager' , (req , res)=>{

   res.json({message: 'Coming soon...'})

})

// Logout route
app.get('/logout' , (req , res)=>{

   res.redirect('/logout')

})

/////////////////////////Server listen ////////////////////////////
const server = app.listen(port, () => {
    console.log('http://localhost:' + port)
})