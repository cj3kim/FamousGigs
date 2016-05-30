var React       = require("react");
var ReactRouter = require("react-router");
var Link        = ReactRouter.Link;
var JobDetailsModel = require("../../../models/company_ad.js");
var JobDetails     = require('./job_details.js');
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
      var model   = new JobDetailsModel({id: adId});
      var promise = model.fetch();
      promise.done(function (model) { _this.setState({ model: model}); });
  },

  render: function () {
    var model = this.state.model;
    return (
      <div className='ad-details'>
        <JobDetails model={model}/>

        <div className="right-col">
          <AdInformation model={model}/>
          <FormContent { ...settings}/>
        </div>
      </div>
    );
  }
})
module.exports = AdDetailsComponent;

