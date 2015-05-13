var FlexColumns = require('../../flex-columns/index');
var WorkForm    = require('../WorkForm'); //This is a singleton

var AddWorkView = new FlexColumns({
  marginTop: 20,
  gutterCol: 20,
  gutterRow: 20
});

AddWorkView.createCol(300).addColNode(0, WorkForm, [300, true]);


module.exports = AddWorkView;
