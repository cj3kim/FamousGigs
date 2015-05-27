var FlexGrid = require('../views/FlexGrid');
var Developers = require('../collections/singleton/developers');
var DeveloperAd = require('../views/DeveloperAd');

var genStarter = require('./genStarter');

module.exports = function () {
  var flexGridOptions = {
    marginTop:  20,
    marginSide: 0,
    gutterCol:  40,
    gutterRow:  40,
    itemSize: [250, 300],
  };

  var flexGrid = genStarter(flexGridOptions, 'Devs', Developers, DeveloperAd);

  return flexGrid;
};

