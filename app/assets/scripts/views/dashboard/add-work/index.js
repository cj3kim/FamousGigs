var FlexColumns = require('../../flex-columns/index');
var WorkForm    = require('../WorkForm'); //This is a singleton

var AddWorkView = new FlexColumns({
  marginTop: 20,
  gutterCol: 20,
  gutterRow: 20
});

var width = 500;
AddWorkView.createCol(width).addColNode(0, WorkForm, [width, true]);


module.exports = AddWorkView;
