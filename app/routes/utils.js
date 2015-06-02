var debug  = require('debug')('app:utils:' + process.pid),
    path   = require('path'),
    redis  = require("redis"),
    client = redis.createClient(),
    _      = require("lodash"),
    jsonwebtoken            = require("jsonwebtoken"),
    TOKEN_EXPIRATION        = 60,
    TOKEN_EXPIRATION_SEC    = TOKEN_EXPIRATION * 60,
    UnauthorizedAccessError = require(path.join(__dirname, '..', 'errors', 'UnauthorizedAccessError'))
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
    ;

client.on('error', function (err) {
  debug(err);
});

client.on('connect', function () {
  debug("Redis successfully connected");
});

module.exports.fetch = function (headers) {
  //console.log('utils.fetch');
  //console.log('------------');
  //console.log(headers);
  //console.log(headers.authorization);
  //console.log('------------');

  if (headers && headers.authorization) {
    var authorization = headers.authorization;
    var part   = authorization.split(' ');
    var token  = part.length === 2 ? part[1] : null;
    return token;
  } else {
      return null;
  }
};

module.exports.create = function (user, req, res, next) {
  if (_.isEmpty(user))
    return next(new Error('User data cannot be empty.'));

  var id = user.get('id');
  var token = jsonwebtoken.sign({id: id }, JWT_SECRET_KEY, {
    expiresInMinutes: TOKEN_EXPIRATION
  });
  var decoded = jsonwebtoken.decode(token);

  var data = {
    id: id,
    user: user.attributes,
    token_info: {
      token: token,
      token_exp: decoded.exp,
      token_iat:decoded.iat
    }
  };

  client.set(token, JSON.stringify(data), function (err, reply) {
    if (err) return next(new Error(err));
    if (reply) {
      client.expire(token, TOKEN_EXPIRATION_SEC, function (err, reply) {
        if (err)
          return next(new Error("Can not set the expire value for the token key"));

        if (reply) {
          req.user = data;
          next(); // we have succeeded
        } else {
          return next(new Error('Expiration not set on redis'));
        }
      });
    } else {
      return next(new Error('Token not set in redis'));
    }
  });

  return data;
};

module.exports.retrieve = function (id, done) {
  if (_.isNull(id))
    return done(new Error("token_invalid"), {"message": "Invalid token"});

  client.get(id, function (err, reply) {
    if (err)
      return done(err, { "message": err });

    if (_.isNull(reply)) {
      return done(new Error("token_invalid"), {
        "message": "Token doesn't exists, are you sure it hasn't expired or been revoked?"
      });
    } else {
      var data = JSON.parse(reply);
      debug("User data fetched from redis store for user: %s", data.username);

      if (_.isEqual(data.token_info.token, id)) {
        return done(null, data);
      } else {
        return done(new Error("token_doesnt_exist"), {
            "message": "Token doesn't exists, login into the system so it can generate new token."
        });
      }
    }
  });
};

module.exports.verify = function (req, res, next) {
  var token = exports.fetch(req.headers);
  //console.log("utils.verify");
  //console.log('----------------');
  //console.log('token: ' + token);
  jsonwebtoken.verify(token, JWT_SECRET_KEY, function (err, decode) {
    //console.log('jsonwebtoken.verify');
    //console.log('----------------');
    //console.log(decode);
    //console.log('----------------');
    if (err) {
      req.user = undefined;
      return next(new UnauthorizedAccessError("invalid_token", err));
    }

    exports.retrieve(token, function (err, data) {
      if (err) {
        req.user = undefined;
        return next(new UnauthorizedAccessError("invalid_token", err));
      }
      req.user = data;
      next();
    });
  });
};

module.exports.expire = function (headers) {
  var token = exports.fetch(headers);
  if (token !== null)
    client.expire(token, 0);
  return token !== null;
};

module.exports.middleware = function () {
  var func = function (req, res, next) {
    var token = exports.fetch(req.headers);
    exports.retrieve(token, function (err, data) {
      if (err) {
        req.user = undefined;
        return next(new UnauthorizedAccessError("invalid_token", data));
      } else {
        req.user = _.merge(req.user, data);
        next();
      }
    });
  };

  func.unless = require("express-unless");
  return func;
};

module.exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
module.exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;

debug("Loaded");
