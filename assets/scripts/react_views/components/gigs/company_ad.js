var React = require('react');
var ReactRouter = require("react-router");
var Link        = ReactRouter.Link;
var pathService = require("path");


var CompanyAd = React.createClass({
  render: function () {
    var _this = this;
    var model = this.props.model;
    function createMarkup() { return { __html: model.description }; };

    var urlPath = !isNaN(model.id) ? pathService.join("gigs", model.id.toString()) : "";

    var logoUrl = model.logo_url;
    var imgBlock = logoUrl ?  <img src={logoUrl} /> : null;

    return (
      <div className="company-ad" >
        {imgBlock}

        <h3><Link className='title' to={urlPath}>{ model.title }</Link></h3>
        <p>{ model.job_location }</p>
        <div className="scrollable" dangerouslySetInnerHTML={createMarkup()} />
      </div>
    );
  }
});

module.exports = CompanyAd;
