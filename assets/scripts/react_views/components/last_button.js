

var React = require('react');
var $ = require('zepto-browserify').$;

var NextButton = React.createClass({
  onClick: function (event) {
    var $div = $(event.target);
    $div.trigger('last-view');
  },

  render: function () {
    return (
      <div className='last-btn' onClick={ this.onClick }>
        <span>{this.props.text}</span>
      </div>
    );
  }
});

module.exports = NextButton;
