var DropzoneMixin = {
  uploadImage: function (file, progressCallback, successCallback) {
    var filePath = "company-ads/logos/";
    var fileSizeLimit = 2097152;
    this.dropAndLoad(file, filePath, fileSizeLimit, progressCallback, successCallback )
  },
  dropAndLoad: function (file, filePath, fileSizeLimit, progressCallback, successCallback) {
    if (file.size > fileSizeLimit) {
      console.log("file too big");
    } else {
      this.initialUpload(file, filePath, progressCallback)
          .then(function (resourceUrl) {
            successCallback(resourceUrl)
          })
          .catch(function (err) {
            console.log('==> err', err);
          });
    }
  }
};
module.exports = DropzoneMixin;

