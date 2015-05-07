var React = require('react');

var DeveloperAd = React.createClass({
  render: function () {
    var _this = this;
    function createMarkup() { 
      return {
        __html: _this.props.description
      }; 
    };
    
    return (
      <div className="stop-gap-div"> 
        <h3 className='title'>{ this.props.full_name }</h3>
        <p>{ this.props.city }</p>
        <div className="scrollable" dangerouslySetInnerHTML={createMarkup()} />
      </div>
    );
  }
});

module.exports = DeveloperAd;
