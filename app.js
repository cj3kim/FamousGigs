
var express = require('express')
var app = express()
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.set('views', './app/views');

app.use('/scripts', serveStatic('public/scripts'));
app.use('/scripts', serveIndex('public/scripts'));


app.get('/', function(req, res) {
  res.render('index')
})

var port = 1337;

app.listen(port);
