var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var FormContent = require('../../react_views/form_content');
var AdEditForm =  require('../../react_views/components/ad_edit_form');

var FlexColumns = require('../flex-columns/flex-columns');

function AdForm () {
  FlexColumns.apply(this, arguments);
  var _this = this;

  var settings = {
    headerName: "Ad Post Form",
    reactClass: AdEditForm
  };

  var adForm = new ReactSurface({
    classes: ['rounded-corners'],
    content: <FormContent {...settings} />
  });
  this.surface = adForm;

  function stampTableName (tableName, data) {
    data.tableName = tableName;
    return data
  }
  adForm.on('next-view', function (event) {
    event.stopPropagation();
    var data = stampTableName("company_ads", event.data)
    _this._eventOutput.trigger('next-view', data);
  });

  this.createCol(600);
  this.addColNode(0, adForm, [600, 620])
}

AdForm.prototype = Object.create(FlexColumns.prototype);
AdForm.prototype.constructor = FlexColumns;

module.exports = AdForm;
