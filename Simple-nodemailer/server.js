var bodyParser = require('body-parser')
var  express = require("express")

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const log = console.log;

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
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'phamp9331@gmail.com',
            pass: '@Phongenter212123'
        }
    });

    // Send to client a waiting email
    transporter.use('compile', hbs({
        viewEngine: 'express-handlebars',
        viewPath: './views/'
    }));


    let mailOptionsClient = {
        from: 'phamp9331@gmail.com',
        to: formData.email,
        subject: '💓 Thank you for your request 💓',
        template: 'index',
        context: {
            name: formData.name
        } // send extra values to template
    };

    transporter.sendMail(mailOptionsClient, (err, data) => {
        var msg = undefined
        if (err) {
            console.log(err)
            msg = 'We are facing some technical difficulties here, come back later 😥'
            res.send(msg)
        }
        msg = 'OK'
        res.send(msg)
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
            var message = 'We are facing some technical difficulties here, come back later 😥'
            res.send(message)
        } else {
            console.log('Email sent: ' + info.response);
            var message = 'OK'
            res.send(message)
        }
    });
})


const server = app.listen(8080, () => {
    return log('http://localhost:8080')
})