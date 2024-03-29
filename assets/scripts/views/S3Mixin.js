
var $ = require('zepto-browserify').$;
var Promise = require('bluebird');
var url = require('url');

var S3Mixin = {
  initialUpload: function (file, filePath, progressCallback) {
    var _this = this;
    if (!file) {
      alert("No file selected");
    }
    return this.getSignedRequest(file, filePath)
      .then(function (response) {
        return Promise.resolve(_this.uploadToS3(file, response.signed_request, response.url, progressCallback));
      })
      .then(function (xhr) {
        var parsedUrl   = url.parse(xhr.responseURL);
        var resourceUrl = parsedUrl.protocol + '//' + parsedUrl.hostname + parsedUrl.pathname;
        return Promise.resolve(resourceUrl);
      });
  },

  getSignedRequest: function (file, filePath) {
    //var userSession = JSON.parse(window.sessionStorage.token_info);
    return Promise.resolve(
      $.ajax({
        type: 'GET',
        url: '/api/sign_s3',
        data: {file_name: filePath + file.name, file_type: file.type},
        //headers: {'Authorization' : "Bearer " + userSession.token }})
      })
    );
  },

  uploadToS3: function (file, signedRequest, url, progressCallback) {
    var _this = this;

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", signedRequest);
      //HEADERS have to reflect the ones on the server.
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.setRequestHeader('Expires', 600);

      xhr.onload = function () {
        var headers = xhr.getAllResponseHeaders().toLowerCase();
        if (xhr.status === 200)
          resolve(xhr);
      };
      xhr.onerror = function () {
        reject(xhr.error);
      };
      xhr.upload.addEventListener('progress', progressCallback)
      xhr.send(file.slice());
    });
  },

};

module.exports = S3Mixin;

