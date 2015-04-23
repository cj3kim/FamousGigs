var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var FlexColumns     = require('../flex-columns/flex-columns');
var FormContent     = require('../../react_views/form_content');
var CompanyEditForm = require('../../react_views/components/company_edit_form');

function CompanyDetails () {
  FlexColumns.apply(this, arguments);
  var _this = this;

  var settings = {
    headerName: "Company Details",
    reactClass: CompanyEditForm
  };

  var companyDetailsForm = new ReactSurface({
    classes: ['rounded-corners'],
    content: <FormContent {...settings}/>
  });

  this.surface = companyDetailsForm;

  function stampTableName (tableName, data) {
    data.tableName = tableName;
    return data
  }

  companyDetailsForm.on('next-view', function (event) {
    event.stopPropagation();
    var data = stampTableName("company_ads", event.data)
    _this._eventOutput.trigger('next-view', data);
  });

  this.createCol(425);
  this.addColNode(0, companyDetailsForm, [425, 620])
}

CompanyDetails.prototype = Object.create(FlexColumns.prototype);
CompanyDetails.prototype.constructor = FlexColumns;

module.exports = CompanyDetails;
