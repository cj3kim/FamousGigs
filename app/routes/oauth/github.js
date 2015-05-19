var Router = require("express").Router;
var RestClient = require('node-rest-client').Client;
var restClient = new RestClient();
var JSONB = require('json-buffer')
var base64_decode = require('base64').decode;

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
console.log(process.env);



module.exports = function () {
  var router = new Router();
  router.route('/oauth/github/callback').get(function (req, res) {
    var clientCode = req.query.code;
    console.log('GITHUB_CLIENT_ID: ' + GITHUB_CLIENT_ID);
    console.log('GITHUB_CLIENT_SECRET: ' + GITHUB_CLIENT_SECRET);
    console.log('clientCode: ' + clientCode);


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
    restClient.post(
      "https://github.com/login/oauth/access_token",
      args,
      function (data, response) {
        var base64_str = JSONB.stringify(data).replace(':base64:', '');
        var str = base64_decode(base64_str);

        var jsonObj = JSON.parse(str)
        var accessToken = jsonObj.access_token;
        console.log('accessToken: ' + accessToken);
      }
    );
  });

  return router;
}


