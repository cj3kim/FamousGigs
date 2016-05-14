
module.exports = function (mainContext) {

  var KaollaSu = {
    computeContextWidth: function () {
      var size = mainContext.getSize();
      var width = size[0];
      return width;
    },

    resizeComputation: function () {
      var width = KaollaSu.computeContextWidth();
      return width > 700 ? [0.185, 0.815] : [0,1] ;
    }
  };

  return KaollaSu;
};

