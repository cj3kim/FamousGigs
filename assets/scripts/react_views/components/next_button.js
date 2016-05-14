var React = require('react');
var $ = require('zepto-browserify').$;

var NextButton = React.createClass({
  onClick: function (event) {
    var $div = $(event.target);
    $div.trigger('next-view');
  },

  render: function () {
    return (
      <div className='next' onClick={ this.onClick }>
        <span>Next</span>
      </div>
    );
  }
});

module.exports = NextButton;
