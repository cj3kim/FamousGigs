
var FlexColumns    = require('../../flex-columns/index');
var ProfileBasics = require('../profile_basics');

var profileView = new FlexColumns({
  marginTop: 20,
  gutterCol: 20,
  gutterRow: 20
});

var profileBasics = new ProfileBasics();

profileView.createCol(450).addColNode(0, profileBasics, 450);


module.exports = profileView;

