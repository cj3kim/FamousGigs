var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var AdFormReact = require('../react_views/ad_form');

var FlexColumns = require('flex-columns');

function AdForm () {
  FlexColumns.apply(this, arguments);

  this.createCol(500);

  var adForm = new ReactSurface({
    size: [500, 500],
    classes: ['rounded-corners'],
    content: <AdFormReact />
  });

  this.addSurfaceToCol(0, adForm)
}

AdForm.prototype = Object.create(FlexColumns.prototype);
AdForm.prototype.constructor = FlexColumns;

module.exports = AdForm;
