
var noticationBox = require('../views/notification/index');

var DropzoneMixin = {
  dropAndLoad: function (files, filePath, fileSizeLimit, callback) {
    var file = files[0];

    if (file.size > fileSizeLimit) {
      noticationBox._eventInput.trigger('new-notification', {
        message: "File is too big to send."
      });
    } else {
      this.initialUpload(file, filePath)
        .then(function (resourceUrl) {
          callback(resourceUrl)
        })
        .catch(function (err) {
          noticationBox._eventInput.trigger('new-notification', {
            message: err.message
          });
        });
    }
  }
};
module.exports = DropzoneMixin;

