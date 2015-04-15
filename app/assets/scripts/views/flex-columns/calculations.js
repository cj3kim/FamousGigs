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
  computeDesktopPosition: function (colIndex, rowIndex, xColOffset, yRowOffset, size, contextWidth) {
    var width = size[0];
    console.log('computeDesktopPosition');
    console.log('xColOffset');
    console.log(xColOffset);

    console.log('size');
    console.log(size);

    var colObj = this.getCol(colIndex);

    var gutterColOffset = colIndex * this.options.gutterCol;
    var x = xColOffset + gutterColOffset;
    var y = yRowOffset + (rowIndex * this.options.gutterRow);

    if (this.options.midAlign) {
      var midAlign = (contextWidth - this.totalWidth)/2 ;
      x += midAlign;
    }

    return [x, y, 0];
  },

  computeMobilePosition: function (colIndex, rowIndex, yColOffset, yRowOffset, size, contextWidth) {
    //TODO add midAlign computations to x here.
    var width = size[0];
    var x = 0;
    var y = yColOffset + yRowOffset + (rowIndex * this.options.gutterRow) + (colIndex * this.options.gutterRow);

    if (this.options.midAlign) {
      x += (contextWidth/2) - (width/2);
    }
    return [x, y, 0];
  },
}
