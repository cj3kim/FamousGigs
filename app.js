
var express = require('express')
var app = express()
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.set('views', './app/views');

app.use('/public', serveIndex('public/'));
app.use('/public', serveStatic('public/'));

app.get('/', function(req, res) {
  res.render('index')
})

var port = 1337;
console.log('Starting server at port ' + port + '.');

app.listen(port);
