var React = require("react");

var AdInformation = React.createClass({

  render: function () {
    var logo_url = this.props.model.logo_url
    var logo = logo_url ? <img className="company-logo" src={logo_url}/> : "";

    var remoteWork = this.props.model.remote ? "Ok" : "No";

    return (
      <div className="ad-information">
        {logo}

        <div className="apply-now-btn">
          <a href={"mailTo:" +this.props.model.contact_email}><span>APPLY</span></a>
        </div>

        <div className="details">
          <span>DETAILS</span>
          <ul>
            <li><span className="flaticon-building104 icon"></span>{ this.props.model.company_name }</li>
            <li><span className="flaticon-pin71 icon"></span>{ this.props.model.job_location } </li>
            <li><span className="flaticon-wifi11 icon"></span> Remote Work: {remoteWork}</li>
          </ul>
        </div>

        <div className="contact">
          <span>CONTACT</span>
          <ul>
            <li> <span className="flaticon-user91 icon"></span>{this.props.model.contact_name}</li>
            <li>  <span className="flaticon-mail59 icon"></span>{this.props.model.contact_email}</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = AdInformation;
