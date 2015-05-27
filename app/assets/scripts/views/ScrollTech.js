var ContainerSurface = require('famous/surfaces/ContainerSurface');
var ScrollView = require('famous/views/Scrollview');


module.exports = function (view) {
  var scrollview = new ScrollView();
  var container = new ContainerSurface();
  container.add(scrollview);
  container.pipe(scrollview);

  scrollview.sequenceFrom([view]);
  return container;
};


