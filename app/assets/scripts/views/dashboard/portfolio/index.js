var FlexColumns    = require('../../flex-columns/index');
var WorkUpload = require('../../work-upload/index');



var portfolio = new FlexColumns({
  marginTop: 20,
  gutterCol: 20,
  gutterRow: 20
});

var workUpload = new WorkUpload();
portfolio.createCol(235).addColNode(0, workUpload, 235);

module.exports = portfolio;
