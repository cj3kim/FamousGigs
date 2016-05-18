var React = require('react');
var ContentHeader = require('./components/content_header');

var GeneralContent = React.createClass({
  render: function () {
    var headerName = this.props.headerName;
    var classes = this.props.classes || [];
    classes.push("general-content");

    var className = classes.join(" ");

    return (
      <div className={className}>
        <ContentHeader headerName={ headerName }/>
        <div className="content-body">
          {this.props.children}
        </div>
     </div>
    );
  }
});

module.exports = GeneralContent;
