var React = require('react');
var ReactRouter = require("react-router");
var Link        = ReactRouter.Link;
var pathService = require("path");


var JobDetails = React.createClass({
  render: function () {
    var _this = this;
    var model = this.props.model;
    function createMarkup() { return { __html: model.description }; };

    var urlPath = !isNaN(model.id) ? pathService.join("gigs", model.id.toString()) : "";
    return (
      <div className="job-details" >
        <h3><Link className='title' to={urlPath}>{ model.title }</Link></h3>
        <p>{ model.job_location }</p>
        <div className="scrollable" dangerouslySetInnerHTML={createMarkup()} />
      </div>
    );
  }
});

module.exports = JobDetails;
