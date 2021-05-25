var express = require('express')

var app = express()

app.set('view engine', 'ejs')

app.use(express.static('views'))
app.use(express.static('views/ajax_load'))

app.get('/', (req, res) => {
    res.render('index')
})


const server = app.listen(8080, () => {
    console.log('http://localhost:8080')
})