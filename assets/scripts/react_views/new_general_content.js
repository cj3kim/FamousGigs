var React = require('react');
var ContentHeader = require('./components/content_header');

var GeneralContent = React.createClass({
  render: function () {
    var headerName = this.props.headerName;
    var className = this.props.className ||  "";
    var classes = [className, "general-content"].join(" ");

    return (
      <div className={classes}>
        <ContentHeader headerName={ headerName }/>
        <div className="content-body">
          {this.props.children}
        </div>
     </div>
    );
  }
});

module.exports = GeneralContent;
