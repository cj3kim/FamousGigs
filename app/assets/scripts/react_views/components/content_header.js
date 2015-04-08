var React = require('react');

var ContentHeader = React.createClass({
  render: function () {
    return (
      <div className="content-header">
        <span>{ this.props.headerName }</span>
      </div>
    );
  }
});


module.exports = ContentHeader;
