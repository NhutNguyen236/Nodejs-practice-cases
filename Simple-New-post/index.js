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
// Views for AJAX page load
app.use(express.static('views/load_ajax'))

///////////////////////////// Cloudinary CONFIG ///////////////////////
cloudinary.config({
  cloud_name: "dup5vuryj",
  api_key: "254592227425713",
  api_secret: "5Lo9nzwORU9bg0mvRpxgmEgFibc"
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "PostImage",
        allowedFormats: ["jpg", "png"],
        transformation: [{
            width: 500,
            height: 500,
            crop: "limit"
        }]
    }
})



const upload = multer({ storage: storage });
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
        //Get record of post from username
        User.findOne({username: req.session.username}).then(function(data){
            // Binds posts ids from User to an array
            var postIds = []
            postIds = data.posts
            
            // Initialize record of posts
            var record = []
            // Added sort here to sort by createdAt in decending order
            Post.find({_id: postIds}).sort({createdAt:-1}).then(function(posts){
                record = posts
                res.render('main/index', {record: record, req})
            })
        })
        
    }
    else{
        res.redirect('/login')
    }

})

// Call Youtube video IDs getter
var idGetter = require('./functions/youtubeID')
app.post('/index', upload.single("postImage"), (req , res)=>{
    // Get post body

    console.log(req.body)
    var postData = {
		title: req.body.title,
		description: req.body.description,
        url_video: idGetter.ybgetID(req.body.url_video),
		img: req.file
	};

    var new_post = undefined
    // Handler for undefined field
    Object.keys(postData).forEach(key => postData[key] === undefined ? delete postData[key] : {});
    // Obj filter
    if(postData.img !== undefined){
        new_post = new Post({title: postData.title, description: postData.description, img: postData.img.path})
    }
    else{
        new_post = new Post(postData)
    }
    // Write above thing to Post
    new_post.save()

    // Input the created post IDs to User posts collection
    User.findOneAndUpdate({username: req.session.username}, {$push: {posts: new_post._id}}, function(err, result){
    })

    // Send data back to AJAX to add it without page reload
    postData.username = req.session.username
    postData.postID = new_post._id
    res.send(postData)
})

app.get('/error' , (req , res)=>{

    res.render('error/error')

})

app.get('/logout' , (req , res)=>{

    req.session.destroy()
    res.redirect('/login')

})

app.post('/deletePost', (req, res) => {
    var body = req.body

    Post.deleteOne({_id: body.post_id}, (err, data) => {
        if(err) console.log(err)
        else{
            res.send(data)
        }
    })
})

app.post('/editPost', (req, res) => {
    var post_id = req.body.post_id
    console

    Post.findOne({_id: post_id}).then(function(data){
        res.send(data)
    })
})

app.post('/submitEdit' , (req , res)=>{

    console.log(req.body.title)

})
////////////////////////////////// SERVER LISTENER ////////////////////

const server = app.listen(3000, () => {
    console.log('http://localhost:3000')
})

