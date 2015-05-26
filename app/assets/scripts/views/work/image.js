var ImageSurface = require('famous/surfaces/ImageSurface');

module.exports = function (options) {
  var attributes = options.attributes;

  var url = attributes.url;
  var lightboxNode = options.lightboxNode;
  var imageSurface = new ImageSurface();
  var lightbox = options.lightbox;

  imageSurface.setContent(url);

  imageSurface.on('click', function () {
    lightbox.show(lightboxNode);
  });

  return imageSurface;
};
