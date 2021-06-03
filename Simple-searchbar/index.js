var express = require('express')
var mongoose = require('mongoose')

var app = express()

app.set('view engine', 'ejs')
app.use(express.static('views'))

// ============== DB connection =============
var db_connection = require('./db')
var User = require('./user')

app.get('/' , (req , res)=>{

   res.render('index')

})

app.get('/search',function(req,res){

    console.log(req.query.key)
    // get user infor from User 
    User.find({email: new RegExp(req.query.key, 'i')}, (err, user) => {
        if(err) console.log(err)
        else{
            var data = []
            for(i = 0; i < user.length; i++){
                data.push(user[i].email)
            }
            console.log(user)
            res.send(data)
        }
    })
});

var server = app.listen(8080, () => {
    console.log('http://localhost:8080')
})

//$(".wrapper").addClass("overlay");