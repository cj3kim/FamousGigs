
var express = require('express')
var app = express()

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.set('views', './app/views');

app.get('/', function(req, res) {
  res.render('index')
})

var port = 1337;

app.listen(port);
