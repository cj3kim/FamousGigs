
var Surface = require('famous/core/surface');
var React = require('react');
var ReactSurface = require('react-surface');
var page = require('page');
var DeveloperAdComponent = React.createClass({
  render: function () {
    var _this = this;
    function createMarkup() { 
      return {
        __html: _this.props.description
      }; 
    };
    return (
      <div className="developer-ad stop-gap-div"> 
        <h3> { this.props.full_name || this.props.email }</h3>
        <img src={ this.props.avatar_url }/>
      </div>
    );
  }
});

module.exports = function (model) {
  var developerAd = new ReactSurface({
    content: <DeveloperAdComponent { ...model.attributes } />
  });

  developerAd.on('click', function (e) {
    console.log('dev ad clicked');
    page.show('/developers/' + model.get('id'));
  });

  return developerAd;
};