var debug  = require('debug')('app:utils:' + process.pid),
    path   = require('path'),
    util   = require('util'),
    redis  = require("redis"),
    redisClient = redis.createClient(),
    _      = require("lodash"),
    jsonwebtoken = require("jsonwebtoken"),
    TOKEN_EXPIRATION = 60,
    TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60,
    UnauthorizedAccessError = require(path.join(__dirname, 'errors', 'UnauthorizedAccessError.js'))
    ;

redisClient.on('error', function () {
  debug(err);
});

redisClient.on('connect', function () {
  debug("Redis successfully connected");
})

var obj = {
  fetch: function (headers) {
    if (headers && headers.authorization){
      var authorization = headers.authorization;
      var part = authorization.split(' ');

      var token = part.length === 2 ? part[1] : null;
      return token;
    } else {
      return null;
    }
  }

};

