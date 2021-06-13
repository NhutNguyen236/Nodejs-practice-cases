var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var  express = require("express")

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('views'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.post('/sendMessage', (req, res) => {
    var formData = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    }

    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'phamp9331@gmail.com',
            pass: '@Phongenter212123',
        }
    });
    
    // Send to admin
    var mailOptions = {
        from: 'phamp9331@gmail.com',
        to: 'nhutnguyenf330@gmail.com',
        subject: 'Customer feedback',
        html: '<h1>Message from '+formData.name+' - '+formData.email+'</h1><h2>'+formData.subject+'</h2><p>'+formData.message+'</p>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            var message = 'The email cannot be sent due to server crash or something else 😞'
            res.send(message)
        } else {
            console.log('Email sent: ' + info.response);
            var message = 'OK'
            res.send(message)
        }
    });

    // Send to the customer
    var mailOptions = {
        from: 'phamp9331@gmail.com',
        to: formData.email,
        subject: '💓 Thank you for your request 💓',
        html: `
            <!DOCTYPE html>
            <html>
            <head>  
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
            </head>
            <body>
                <div class="jumbotron text-center">
                    <h1 class="display-3">Thank You so much!</h1>
                    <p class="lead"><strong>Please always keep up with your email</strong> because we will come right back to you real soon</p>
                    <hr>
                    <p>
                        Don't want to wait? <a href="mailto:nhutnguyenf330@gmail.com">Contact us right the way at nhutnguyenf330@gmail.com</a>
                    </p>
                    <p class="lead">
                        <a class="btn btn-primary btn-sm" href="https://tdtu-noticlone.herokuapp.com/login" role="button">Continue to homepage</a>
                    </p>
                </div>
            </body>
            </html>
        `
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent to client: ' + info.response);
        }
    });

    
})

var server = app.listen(8080, () => {
    console.log('http://localhost:8080')
})