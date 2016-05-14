var View = require('famous/core/View');
var genWorks = require('../../starters/works');
var Works = genWorks();

function DevContent() {
  View.apply(this, arguments);

  this._node.add(Works);
  this.update = function (model) {
    Works.loadWorks(model.get('id'))
  }
};

DevContent.prototype = Object.create(View.prototype);
DevContent.prototype.constructor = DevContent;

module.exports = DevContent;

