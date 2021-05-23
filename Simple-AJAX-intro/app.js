var express = require('express')
var request = require('request')

var app = express()

app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('functions'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/searching', function(req, res){
    var val = req.query.search;
    console.log(val);

    var craig = ''

    // Yahoo Query API has been shut down long ago so I turn it into Google one
    var url = "https://www.google.com/search?q=" + val + "&aqs=chrome..69i57j35i39l2j0i433l2j69i60l3.1126j0j4&sourceid=chrome&ie=UTF-8";
    console.log(url);
    var hello = '<a href ="'+url+'">'+url+'</a>'
    res.send(hello)

    // // request module is used to process the yql url and return the results in JSON format
    // request(url, function(err, resp, body) {
    //     body = JSON.parse(body);
    //     // logic used to compare search results with the input from user
    //     if (!body.query.results.RDF.item) {
    //         craig = "No results found. Try again.";
    //     } 
    //     else {
    //         results = body.query.results.RDF.item[0]['about'];
    //         craig = '<a href ="'+results+'">'+results+'</a>'
    //     }

    //     res.send(craig);
    // });
    
    // pass back the results to client side
    
});

const server = app.listen(8080, () => {
    console.log('http://localhost:8080')
})