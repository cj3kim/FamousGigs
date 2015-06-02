var _      = require("lodash"),
    path   = require('path'),
    utils  = require("./utils"),
    Router = require("express").Router,
    UnauthorizedAccessError = require(path.join(__dirname, "..", "errors", "UnauthorizedAccessError.js")),
    PasswordsDontMatch = require(path.join(__dirname, "..", "errors", "PasswordsDontMatch.js")),
    AccountAlreadyExists = require(path.join(__dirname, "..", "errors", "AccountAlreadyExists.js")),
    ServerError = require(path.join(__dirname, "..", "errors", "ServerError.js")),
    User  = require(path.join(__dirname, "..", "models", "User.js")),
    jwt    = require("express-jwt")
;

var authRouteLogger = require('../loggers/routes/index').authentication;

var authenticate = function (req, res, next) {
  var user     = req.body.user;
  var email    = user.email
    , password = user.password;

  if (_.isEmpty(email) || _.isEmpty(password))
    return next(new UnauthorizedAccessError("401", { message: 'Invalid username or password' }));

  process.nextTick(function () {
    User.login(email, password)
      .then(function (user) {
        utils.create(user, req, res, next);
      })
      .catch(function (err) {
        authRouteLogger.error({error: err, req: req});

        return next(new UnauthorizedAccessError("401", {
          message: err.message
        }));
      })
  });
};

module.exports = function () {
  var router = new Router();
  router.route("/verify").get(utils.verify, function (req, res, next) {
    return res.status(200).json({ status: 200 });
  });

  router.route("/login").post(authenticate, function (req, res, next) {
    return res.status(200).json(req.user);
  });

  router.route("/logout").get(function (req, res, next) {
    if (utils.expire(req.headers)) {
      delete req.user;
      return res.status(200).json({"message": "User has been successfully logged out"});
    } else {
      return next(new UnauthorizedAccessError("401"));
    }
  });

  router.route("/registration").post(function (req, res, next) {
    var _user = req.body.user;

    process.nextTick(function () {
      User.register(_user.email, _user.password, _user.password_confirmation)
        .then(function (user) {
          var func = function () {
            res.status(200).json(req.user);
          };
          utils.create(user, req, res, func);
        })
        .catch(function (err){
          authRouteLogger.error({error: err, req: req});

          var re1 = /passwords don't match/i;
          var re2 = /unique constraint "users_email_unique"/i;
          if (re1.test(err.message)) {
            return next(new PasswordsDontMatch(403, {message: err.message}));
          } else if (re2.test(err.message)) {
            return next(new AccountAlreadyExists(403, {message: "Email already exists."}));
          } else {
            return next(new ServerError(501, {
              message: "Something went wrong with the server"
            }));
          }
        });
    });
  });

  router.unless = require("express-unless");
  return router;
};
