var _ = require('underscore');

module.exports = {
  computeColHeight: function (states) {
    var totalHeight = 0;
    _.each(states, function (state, i ) {
      var size = state.size.get();
      var height = size[1];

      totalHeight += height;
    });

    console.log(states);
    return totalHeight;
  },
  computeDesktopPosition: function (xColOffset, yRowOffset, size) {
    var width = size[0];

    var x = xColOffset;
    var y = yRowOffset;

    return [x, y, 0];
  },

  computeMobilePosition: function (yColOffset, yRowOffset, size) {
    //TODO add midAlign computations to x here. 
    var x = 0;
    var y = yColOffset + yRowOffset; 

    return [x, y, 0];
  },
}
