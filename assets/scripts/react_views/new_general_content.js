var React = require('react');

var GeneralContent = React.createClass({
  render: function () {
    var headerName = this.props.headerName;
    var className = this.props.className ||  "";
    var classes = [className, "general-content"].join(" ");

    var header = typeof headerName === "string" ? <div className="content-header"> <span>{ headerName }</span> </div> : null;
    return (
      <div className={classes}>
        {header}
        <div className="content-body">
          {this.props.children}
        </div>
     </div>
    );
  }
});

module.exports = GeneralContent;
