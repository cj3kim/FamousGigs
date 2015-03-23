var React = require('react');

var CompanyAd = React.createClass({
  render: function () {
    return (
      <div className="stop-gap-div"> 
        <h3 className='title'>{ this.props.title }</h3>
        <p>{ this.props.job_location }</p>
        <p>{ this.props.description }</p>
      </div>
    );
  }
});


module.exports = CompanyAd;
