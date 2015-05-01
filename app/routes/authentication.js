var debug  = require('debug')('app:routes:default' + process.pid),
    _      = require("lodash"),
    path   = require('path'),
    bcrypt = require('bcryptjs'),
    utils  = require("./utils"),
    Router = require("express").Router,
    UnauthorizedAccessError = require(path.join(__dirname, "..", "errors", "UnauthorizedAccessError.js")),
    User  = require(path.join(__dirname, "..", "models", "User.js")),
    Users = require(path.join(__dirname, "..", "collections", "Users.js")),
    jwt    = require("express-jwt");

var authenticate = function (req, res, next) {
  debug("Processing authenticate middleware");

  var email = req.body.email
    , password = req.body.password;

  if (_.isEmpty(email) || _.isEmpty(password))
    return next(new UnauthorizedAccessError("401", { message: 'Invalid username or password' }));

  process.nextTick(function () {
    User.login(email, password)
      .then(function (user) {
        utils.create(user, req, res, next);
      })
      .catch(function (err) {
        return next(new UnauthorizedAccessError("401", {
          message: "Invalid username or password"
        }));
      })
  });
};

module.exports = function () {
  var router = new Router();
  router.route("/verify").get(function (req, res, next) {
    return res.status(200).json(undefined);
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

    new User({
      email:    _user.email,
      password: _user.password
    }).save().then(function (user) {
      var func = function () {
        res.status(200).json({cool: "ready"});
      };
      utils.create(user.attributes, req, res, func);
    }).catch(function (err){
      console.log("There was an error with registration.");
      console.log(err);
    })
  });


  router.unless = require("express-unless");
  return router;
};
