var path        = require('path'),
    fs          = require('fs'),
    jwt         = require("express-jwt"),
    utils       = require(path.join(__dirname, "app", "routes", "utils.js")),
    NotFoundError = require(path.join(__dirname, "app", "errors", "NotFoundError.js"));
    unless      = require('express-unless')
  ;


var express = require('express');
var app = express();
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './app/views');

var bodyParser   = require('body-parser'),
    multer       = require('multer'),
    compression  = require('compression')(),
    responseTime = require('response-time')()
;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(compression);
app.use(responseTime);

var jwtCheck = jwt({secret: "test"});
jwtCheck.unless = unless;

app.use('/public', serveIndex('public/'));
app.use('/public', serveStatic('public/'));

var whitelist = '/api/registration';
app.all('/api/*', jwtCheck.unless({path: whitelist}));
app.all('/api/*', utils.middleware().unless({path: whitelist }));

app.use('/api', require(path.join(__dirname, 'app', 'routes', 'authentication.js'))());

app.get('/', function(req, res) {
  res.render('index')
})

require('./app/routes/company_ads/index')(app);

var port = 1337;
console.log('Starting server at port ' + port + '.');

app.listen(port);
