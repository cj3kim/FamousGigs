
var Surface = require('famous/core/Surface');
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
        <div className="overlay">
          <span>{ this.props.full_name || this.props.email }</span>
        </div>
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
    page.show('/developers/' + model.get('id'));
  });

  return developerAd;
};
