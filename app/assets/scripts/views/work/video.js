
var VideoSurface = require('famous/surfaces/VideoSurface');

module.exports = function (options) {
  var url = options.url;
  var lightboxNode = options.lightboxNode;
  var lightbox = options.lightbox;

  var videoSurface = new VideoSurface();
  videoSurface.setContent(url);
  videoSurface.on('click', function () {
    this._element.play();
    lightbox.show(lightboxNode);
  });
  return videoSurface;
};
