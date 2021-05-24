var express =   require("express");
var multer  =   require('multer');
var app     =   express();
var bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

////////////////////////// CLOUDINARY STORAGE CONFIG /////////////////////
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dup5vuryj",
    api_key: "254592227425713",
    api_secret: "5Lo9nzwORU9bg0mvRpxgmEgFibc"
})

const { CloudinaryStorage } = require('multer-storage-cloudinary');

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

var upload = multer({ storage : storage});

app.get('/',function(req,res){
    res.render('index')
});

// Main ref here, such a life savior: https://grokonez.com/node-js/multer/nodejs-express-upload-text-fields-multipartfile-with-multer-jquery-ajax-bootstrap-4
// Handle uploading post in backend
app.post('/upload', upload.single("resume"), (req, res) => {
    var applicationform = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		phone: req.body.phone,
		file: req.file
	};
	
    console.log(applicationform)
	// log applicationForm
	// console.log(JSON.stringify(applicationform, null, 4));
	
    // Send data back to AJAX 
	res.send(applicationform);
});

app.listen(3000,function(){
    console.log("http://localhost:3000");
});