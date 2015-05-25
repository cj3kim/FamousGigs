var React = require('react');
var ReactSurface = require('react-surface');

var View = require('famous/core/View');
var CompanyAd     = require('../../react_views/components/company_ad');
var AdInformation = require('./ad_information');
var JoinUs = require('./JoinUs');
var FormContent   = require('../../react_views/form_content');

var settings = {
  headerName: "Developer Signup",
  reactClass: JoinUs,
  id: 'developer-signup'
};

var AdDetailsComponent = React.createClass({
  render: function () {
    return (
      <div className='ad-details'>
        <div className='col one'>
          <CompanyAd { ...this.props}/>
        </div>

        <div className='col two'>
          <AdInformation {...this.props }/>

          <FormContent { ...settings}/>
        </div>
      </div>
    );
  }, 

});

function AdDetails() {
  View.apply(this, arguments);

  this.initialize();
  this.setupEventListeners();
};

AdDetails.prototype = Object.create(View.prototype);
//AdDetails.prototype = Object.create(FlexColumns.prototype);
//AdDetails.prototype.constructor = FlexColumns;

AdDetails.prototype.initialize = function () {
  var props = {
    description: "",
    title: "",
    job_location: "",
    setClass: true
  };
  var surface = new ReactSurface({
    content: <AdDetailsComponent { ...props }/> 
  });
  this.surface = surface;
  this._node.add(surface);
};

AdDetails.prototype.setupEventListeners = function () {
  var _this = this;
  this._eventInput.on('reset-ad-details', function (model) {
    var attributes = model.attributes;
    attributes.setClass = true;
    _this.surface.setContent(<AdDetailsComponent { ...attributes } />);
  });
};

module.exports = AdDetails;

