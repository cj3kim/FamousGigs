var React = require('react');

var GeneralContent = React.createClass({
  render: function () {
    var ReactClass = this.props.reactClass; 
    var headerName = this.props.headerName;
    var attributes = this.props.attributes;

    return (
      <div className="general-content stop-gap-div">
        <div className="content-header">
          <span>{ headerName }</span>
        </div>

        <div className="content-body"> 
          <ReactClass{...attributes} />
        </div>
     </div>
    );
  }
});

module.exports = GeneralContent;
