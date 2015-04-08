var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var CompanyDetailsReact = require('../../react_views/company_details');

var FlexColumns = require('flex-columns');

function CompanyDetails () {
  FlexColumns.apply(this, arguments);
  var _this = this;

  this.createCol(425);

  var adForm = new ReactSurface({
    size: [425, 620],
    classes: ['rounded-corners'],
    content: <CompanyDetailsReact />
  });
  this.surface = adForm;

  function stampTableName (tableName, data) {
    data.tableName = tableName;
    return data
  }

  adForm.on('next-view', function (event) {
    event.stopPropagation();
    var data = stampTableName("company", event.data)
    _this._eventOutput.trigger('next-view', data);
  });

  this.addSurfaceToCol(0, adForm)
}

CompanyDetails.prototype = Object.create(FlexColumns.prototype);
CompanyDetails.prototype.constructor = FlexColumns;

module.exports = CompanyDetails;
