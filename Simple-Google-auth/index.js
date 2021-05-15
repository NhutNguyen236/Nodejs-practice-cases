////////////////////////////// Entry point setup///////////////////////
var express = require('express')
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var key = require('./config/key')

var app = express();

// Set up port
var port = process.env.port || 3000

// Config DB and schema
var User = require('./models/user_student')
var Profile = require('./models/profile')
var db_connection = require('./config/db') 

// view engine setup
app.set('view engine', 'ejs');

//////////////////////////////Google Oauth config//////////////////////
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

// Basically, replace these 2 fields with your gg client id and secret key
// const GOOGLE_CLIENT_ID = '1615839175-s2nldpmf4t4l2o60d4saqpn72v10qaj5.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = 'YrlNs-98zLycrtSABaKZ4SvT';
passport.use(new GoogleStrategy({
    clientID: key.google.clientID,
    clientSecret: key.google.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
  

//////////////////////////////Express-Session config//////////////////////
app.use(session({

	// It holds the secret key for session
	secret: 'Your_Secret_Key',

	// Forces the session to be saved
	// back to the session store
	resave: true, //false

	// Forces a session that is "uninitialized"
	// to be saved to the store
	saveUninitialized: true
}))


//////////////////////////////Routes definition//////////////////////
app.get('/', (req, res) => {
  res.redirect('/index')
})

app.get('/login', (req, res) => {   
    // Check if there is session or not
    if(req.session.userid){
        res.redirect('/index')
    }
    else{
        res.render('login')
    }
})

app.get('/index', (req, res) => {   
  user = userProfile
  //Check if there is session or not
  if(req.session.userid){
    res.render('index', user)
  }
  else{
      res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  if(req.session.userid){
    req.session.destroy()
    res.redirect('/login')
  }
})

app.get('/test', (req, res) => {
	res.send(userProfile)
})

var db = mongoose.connection
var userProfile

app.get('/googleAuthen', (req, res) => {
  res.redirect('/auth/google')
})

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    // Check in Database if the user is there or not with googleID
    User.find({googleID: userProfile.id}, (err, data) => {
      if(err){
        return console.log(err)
      }
      else{
        // If the user is there already, move to index page
        if(data && data.length != 0){
          req.session.userid = userProfile.id
          return res.redirect('/index');
        }
        // Else, user is new to db, write user in
        else{
          // create new schema
          var new_user = new User({googleID: userProfile.id, email: userProfile.emails[0].value, role: 0})
          
          //create profile schema
          var new_profile = new Profile({displayname: userProfile.displayName, class: 'Class01', dean: 'Dean01'})
          // create new profile schema
          // save user
          new_user.save((err, collection) => {
            if(err){
              return res.send(err)
            }
            else{
              req.session.userid = userProfile.id
              return res.redirect('/index');
            }
          })
          // save profile
          new_profile.save((err, collection) => {
          })
        }
      }
    })
    
});



var server = app.listen(port, () =>{
    console.log("The server is now running at http://localhost:" + port);
})	