
var express = require('express')
var app = express()
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.set('views', './app/views');

var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use('/public', serveIndex('public/'));
app.use('/public', serveStatic('public/'));

app.get('/', function(req, res) {
  res.render('index')
})

require('./app/routes/company_ads/index')(app);

var port = 1337;
console.log('Starting server at port ' + port + '.');

app.listen(port);
