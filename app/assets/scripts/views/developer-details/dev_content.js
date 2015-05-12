var View = require('famous/core/View');
var Works = require('../../starters/works');

function DevContent() {
  View.apply(this, arguments);

  this._node.add(Works);
};

DevContent.prototype = Object.create(View.prototype);
DevContent.prototype.constructor = DevContent;

module.exports = DevContent;

