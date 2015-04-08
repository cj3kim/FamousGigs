var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var AdFormReact = require('../../react_views/ad_form');

var FlexColumns = require('flex-columns');

function AdForm () {
  FlexColumns.apply(this, arguments);

  var _this = this;

  this.createCol(425);

  var adForm = new ReactSurface({
    size: [425, 620],
    classes: ['rounded-corners'],
    content: <AdFormReact />
  });
  this.surface = adForm;

  function stampTableName (tableName, data) {
    data.tableName = tableName;
    return data
  }
  adForm.on('next-view', function (event) {
    event.stopPropagation();
    var data = stampTableName("company_ad", event.data)
    _this._eventOutput.trigger('next-view', data);
  });
  this.addSurfaceToCol(0, adForm)

}

AdForm.prototype = Object.create(FlexColumns.prototype);
AdForm.prototype.constructor = FlexColumns;

module.exports = AdForm;
