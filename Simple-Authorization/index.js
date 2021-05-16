////////////////////////////// Entry point setup///////////////////////
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')


app = express()

// Set up port
var port = process.env.port || 3000

////////////////////////////// VIEW ENGINE ///////////////////////////////
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended: true}))

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
var login = require('./controller/loginValidator')

app.get('/', (req, res) => {
    res.redirect('/index')
  })
  
app.get('/login', (req, res) => {   
    // Check if there is session or not
    if(req.session.username){
        res.redirect('/index')
    }
    else{
        res.render('login')
    }

})

app.post('/login', (req, res) => {   
    /**
     * For this simple authorization, we just have 2 roles, 1 - casual user, 2 - VIP
     * We block 
     */
    var user = req.session
    var account = req.body

    console.log(account)
    
    if(account.username == 'vip'){
        user.username = 2
        return res.redirect('/index')
    }
    user.username = 1
    res.redirect('/index')
})

app.get('/index', (req, res) => {   
    login.routeJump(req, res, 'main', '/login')
})

app.get('/logout', (req, res) => {   
    req.session.destroy()

    res.redirect('/login')
})


//////////////////////////// SERVER LISTENER ////////////////////////////\
var server = app.listen(port, () =>{
    console.log("The server is now running at http://localhost:" + port);
})	