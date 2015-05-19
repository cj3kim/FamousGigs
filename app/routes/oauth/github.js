var Router = require("express").Router;
var RestClient = require('node-rest-client').Client;
var path = require('path');
var restClient = new RestClient();
var JSONB = require('json-buffer')
var base64_decode = require('base64').decode;

var Promise = require('bluebird');
var utils  = require("../utils");
var User  = require(path.join(__dirname, "..", "..", "models", "User.js"));
var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

function decodeBufferToJSON(data) {
    var base64_str = JSONB.stringify(data).replace(':base64:', '');
    var str = base64_decode(base64_str);

    console.log('str: ' + str);
    var jsonObj = JSON.parse(str)
    return jsonObj
};


module.exports = function () {
  var router = new Router();

  router.route('/oauth/github/callback').get(function (req, res) {
    var clientCode = req.query.code;
    var args = {
      data: {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: clientCode,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      }
    };

    var postPromise = new Promise(function (resolve, reject) {
      restClient.post( "https://github.com/login/oauth/access_token", args,
        function (data, response) {
          var jsonObj = decodeBufferToJSON(data);
          var accessToken = jsonObj.access_token;
          resolve(accessToken);
        }
      );
    });

    postPromise
      .then(function(access_token) {
        var authHeader = 'token ' + access_token;
        var obj = { headers: { 
          "User-Agent" : "FamousGigs Server",
          "Authorization" : authHeader } };

        restClient.get("https://api.github.com/user", obj, function (data, response) {
          var userObj = decodeBufferToJSON(data)
          var options = { user: userObj, github_id: userObj.id };
          console.log('user retrieval');
          console.log(options);
          User.findOrCreate(options)
            .then(function (model) {
              var func = function () { 
                //TODO Save this problem for later. Possibly put it in a popup.
                res.status(200).send('OK');
              };
              utils.create(model, req, res, func);
            })
        });
      })
  });

  router.route('/oauth/github/registration').post(function (req, res) {


  });

  return router;
}


