const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

///////////////////////////// VIEW CONFIG /////////////////////////////
app.set('view engine', 'ejs');
app.use(express.static('views'))
// views for error page
app.use(express.static('views/error'))

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

app.get('/login' , (req , res)=>{

    res.render('login/index')
})

app.post('/login' , (req , res)=>{
    // Get body req
    var body = req.body

    // search up username from req in db
    User.findOne({username: body.username}, (err, data) => {
        if(err) res.render('error/error')
        if(data){
            res.render('main/index')
        }
    })

})
app.post('/upload', parser.single('image'), function (req, res) {
  res.json(req.file);
});

const server = app.listen(3000, () => {
  console.log('http://localhost:3000')
})