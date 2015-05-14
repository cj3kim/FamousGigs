var debug  = require('debug')('app:routes:default' + process.pid);
var Router = require("express").Router;
var Promise = require('bluebird');
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET
var aws = require('aws-sdk');

Promise.promisifyAll(aws.S3);

module.exports = function () {
  var router = new Router();

  router.route('sign_s3')
    //Check if utils.verify is necessary here
    .get(function (req, res) {
      aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
      var s3 = new aws.S3();
      var s3_params = {
          Bucket: S3_BUCKET,
          Key: req.query.file_name,
          Expires: 60,
          ContentType: req.query.file_type,
          ACL: 'public-read'
      };

      var signPromise = s3.getSignedUrlAsync('putObject', s3_params);
      signPromise
        .then(function (data) {
          var obj = {
            signed_request: data,
            url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
          };
          res.json(obj);
        })
        .catch(function (err) {
          console.log("There was an error in amazon.js");
          console.log(err);
        })
  });
}

