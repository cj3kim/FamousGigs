var React = require('react');
var ReactRouter = require("react-router");
var Link        = ReactRouter.Link;
var pathService = require("path");

var Moment = require("moment");
var GeneralContent = require("../../new_general_content");

var CompanyAd = React.createClass({
  render: function () {
    var _this = this;
    var model = this.props.model;
    function createMarkup() { return { __html: model.description }; };

    var urlPath = !isNaN(model.id) ? pathService.join("gigs", model.uuid) : "";

    var logoUrl = model.logo_url;
    var imgBlock = logoUrl ?  <img src={logoUrl} /> : null;

    return (
      <GeneralContent className="company-ad">
        {imgBlock}
        <div className="company-ad-body">
          <h3><Link className='title' to={urlPath}>{ model.title }</Link></h3>
          <p>{ model.job_location }</p>
          <p>{ Moment(model.created_at).format("MMMM Do YYYY") }</p>
          <div className="scrollable" dangerouslySetInnerHTML={createMarkup()}></div>
        </div>
      </GeneralContent>
    );
  }
});

module.exports = CompanyAd;
