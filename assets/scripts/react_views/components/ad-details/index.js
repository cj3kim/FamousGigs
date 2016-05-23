var React       = require("react");
var ReactRouter = require("react-router");
var Link        = ReactRouter.Link;
var CompanyAdModel = require("../../../models/company_ad.js");
var CompanyAd     = require('../../../react_views/components/gigs/company_ad.js');
var AdInformation = require('./ad_information');
var JoinUs        = require('./JoinUs');
var FormContent   = require('../../form_content');

var settings = {
  headerName: "Developer Signup",
  reactClass: JoinUs,
  id: 'developer-signup'
};


var AdDetailsComponent = React.createClass({
  getInitialState: function () {
      return { model: {}};
  },
  componentDidMount: function () {
      var _this   = this;
      var adId    = this.props.params.job_id;
      var model   = new CompanyAdModel({id: adId});
      var promise = model.fetch();
      promise.done(function (model) { 
        console.log('==> model', model);
        _this.setState({ model: model}); })
  },

  render: function () {
    var model = this.state.model;
    return (
      <div className='ad-details'>
        <div className='col one'>
          <CompanyAd model={model}/>
        </div>

        <div className='col two'>
          <AdInformation model={model}/>

          <FormContent { ...settings}/>
        </div>
      </div>
    );
  }
})
module.exports = AdDetailsComponent;

