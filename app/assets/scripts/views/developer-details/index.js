var View = require('famous/core/View');
var DevHeader = require('./dev_header');
var DevContent = require('./dev_content');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');


function DevProfile() {
  View.apply(this, arguments)
  var headerHeight = 280;

  var contentMod = new Modifier({
    transform: Transform.translate(0, headerHeight, 0)
  });

  var devHeader = new DevHeader(headerHeight);
  var devContent = new DevContent();

  this._node.add(contentMod).add(devContent);
  this._node.add(devHeader);

  this.update = function (model) {
    devHeader.update(model);
  };
};

DevProfile.prototype = Object.create(View.prototype);
DevProfile.prototype.constructor = DevProfile;

module.exports = DevProfile;
