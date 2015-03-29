
var ViewSequence = require('famous/core/ViewSequence');
var Surface = require('famous/core/surface');

var surfaces = [];
for (var i = 0; i < 10; i += 1) {
  var newSurface = new Surface({});
  newSurface.numId = i;

  surfaces.push(newSurface);
}

var viewSequence = new ViewSequence({index: 0, array: surfaces, loop: true });


module.exports = viewSequence;



