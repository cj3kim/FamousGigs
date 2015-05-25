var React = require('react');

var CompanyAd = React.createClass({

  render: function () {
    var _this = this;
    function createMarkup() { 
      return {
        __html: _this.props.description 
      };
    };

    var company = this.props.setClass ? "company-ad" : "";
    var frontPage = this.props.frontPage ? "front-page" : "";

    var string = frontPage + company;

    return (
      <div className={ string }> 
        <h3 className='title'>{ this.props.title }</h3>
        <p>{ this.props.job_location }</p>
        <div className="scrollable" dangerouslySetInnerHTML={createMarkup()} />
      </div>
    );
  }
});


module.exports = CompanyAd;
