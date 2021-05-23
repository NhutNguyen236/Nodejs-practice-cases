const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
var bodyParser = require('body-parser')
var session = require('express-session')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

////////////////////////////// SESSION CONFIG ///////////////////////////
app.use(session({

    // It holds the secret key for session
    secret: 'Your_Secret_Key',

    // Forces the session to be saved
    // back to the session store
    resave: true,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}))

///////////////////////////// VIEW CONFIG /////////////////////////////
app.set('view engine', 'ejs');
app.use(express.static('views'))
// views for error page
app.use(express.static('views/error'))
// views for main page
app.use(express.static('views/main'))

///////////////////////////// Cloudinary CONFIG ///////////////////////
cloudinary.config({
  cloud_name: "dup5vuryj",
  api_key: "254592227425713",
  api_secret: "5Lo9nzwORU9bg0mvRpxgmEgFibc"
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'PostImage',
    format: async (req, file) => 'png, jpg', // supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
  },
});


const parser = multer({ storage: storage });
//////////////////////////////// Middlewares config //////////////////////////
require('./config/db')
var User = require('./models/user')
var Post = require('./models/post')



//////////////////////////////// ROUTES /////////////////////////////////////
app.get('/' , (req , res)=>{

  res.redirect('/login')

})

var userFind = require('./functions/findUser')

app.get('/login' , (req , res)=>{
    // Check session
    if(req.session.username){
        res.redirect('/index')
    }
    else{
        res.render('login/index')
    } 
})

app.post('/login' , (req , res)=>{
    
    // Get body req
    var body = req.body
    
    // Look up username
    userFind.userFind(body.username).then(function(data){
        if(data != null){
            // write session to remember user 
            req.session.username = body.username
            res.redirect('/index')
        }

        else{
            res.redirect('/error')
        }
    })
})

// Index page route
app.get('/index' , (req , res)=>{
    // Check if session is set
    if(req.session.username){
        res.render('main/index', {record: []})
    }
    else{
        res.redirect('/login')
    }

})

app.post('/index' , (req , res)=>{
    // Get post body
    var postBody = req.body

    

})

app.get('/error' , (req , res)=>{

    res.render('error/error')

})

app.get('/logout' , (req , res)=>{

    req.session.destroy()
    res.redirect('/login')

})

app.post('/upload', parser.single('image'), function (req, res) {
    res.json(req.file);
});

const server = app.listen(3000, () => {
    console.log('http://localhost:3000')
})