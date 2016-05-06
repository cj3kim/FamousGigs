var path        = require("path"),
    fs          = require("fs"),
    appConfig   = require("./config/app.json")
    jwt         = require("express-jwt"),
    utils       = require(path.join(__dirname, "app", "routes", "utils.js")),
    unless      = require("express-unless"),
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY,
    NotFoundError = require(path.join(__dirname, "app", "errors", "NotFoundError.js")),
    NODE_ENV    = process.env.NODE_ENV
  ;

var bodyParser   = require("body-parser"),
    multer       = require("multer"),
    compression  = require("compression")(),
    responseTime = require("response-time")()
;

var repl = require("repl");
if (NODE_ENV === "development") {
  repl.start({ prompt: "node via stdin> ",
    input: process.stdin,
    output: process.stdout
  });
}

var express = require("express");
var app = express();
var serveIndex = require("serve-index");
var serveStatic = require("serve-static");

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", "./app/views");
var middlewareModules = [ bodyParser.json(), // for parsing application/json
                          bodyParser.urlencoded({ extended: true }), // for parsing application/x-www-form-urlencoded
                          multer(), // for parsing multipart/form-data
                          compression,
                          responseTime
                          ];
middlewareModules.forEach(function (_modules) { app.use(_modules); });

var jwtCheck    = jwt({secret: JWT_SECRET_KEY});
jwtCheck.unless = unless;

app.use("/public", serveIndex("public/"));
app.use("/public", serveStatic("public/"));
var whitelist = ["/api/registration", "/api/oauth/github/callback", "/api/login", "/api/verify", "/api/sign_s3", "/developers"];

app.all("/api/*", jwtCheck.unless({path: whitelist}));
app.all("/api/*", utils.middleware().unless({path: whitelist }));

var authRoutes = ["authentication", "amazon.js", "oauth/github.js"];
authRoutes.map(function (authRoute) {
            var _path   = path.join(__dirname, "app", "routes", authRoute)
            var _module = require(_path)();
            return _module;
          })
          .forEach(function (_module) { app.use("/api", _module); });


var MobileDetect = require("mobile-detect");

app.get("/", function(req, res) {
  var md = new MobileDetect(req.headers["user-agent"]);
  var isMobile   = !!md.mobile();
  var showMobile = appConfig.showMobile;

  var template = isMobile && showMobile ?  "mobile" : "index";
  res.render(template);
});

var executeRoute = genExecuteMainRoute(app);
var mainRoutes = ["company_ads", "developers", "works"];
mainRoutes.forEach(function (mainRoute) { executeRoute(mainRoute); });

var port = appConfig.server[NODE_ENV].port;
console.log("Starting server at port " + port + ".");

app.listen(port);

// route generation code
function genExecuteMainRoute (app) {
  return function executeRoute (main) {
    var _path = path.join(__dirname, "app", "routes", main, "index");
    require(_path)(app);
  }
}
