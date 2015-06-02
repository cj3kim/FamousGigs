var debug  = require('debug')('app:routes:default' + process.pid);
var Router = require("express").Router;
var Promise = require('bluebird');
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET
var aws = require('aws-sdk');

aws.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
});

var amazonRouteLogger = require('../loggers/routes/index').amazon;

module.exports = function () {
  var router = new Router();

  router.route('/sign_s3').get(function (req, res) {
      var s3 = new aws.S3();
      var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 600,
        ContentType: req.query.file_type,
        ACL: 'public-read'
      };

      var signPromise = new Promise(function (resolve, reject) {
        s3.getSignedUrl('putObject', s3_params, function (err, data) {
          if (err) reject(err);
          else resolve(data);
        });
      });

      signPromise
        .then(function (data) {
          var obj = {
            signed_request: data,
            url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
          };
          res.json(obj);
        })
        .catch(function (err) {
          amazonRouteLogger.error({error: err, req: req}, "Amazon s3 signing error.");
          res.status(501).json({error: err});
        });
  });
  return router;
}

