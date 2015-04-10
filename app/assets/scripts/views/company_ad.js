var React = require('react');

var CompanyAd = React.createClass({
  render: function () {
    var _this = this;
    function createMarkup() { 
      return {
        __html: _this.props.description
      }; 
    };
    
    return (
      <div className="stop-gap-div"> 
        <h3 className='title'>{ this.props.title }</h3>
        <p>{ this.props.job_location }</p>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    );
  }
});


module.exports = CompanyAd;
