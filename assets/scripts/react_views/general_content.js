var React = require('react');
var ContentHeader = require('./components/content_header');

var GeneralContent = React.createClass({
  render: function () {
    var ReactClass = this.props.reactClass; 
    var headerName = this.props.headerName;
    var attributes = this.props.attributes;

    return (
      <div className="general-content stop-gap-div">
        <ContentHeader headerName={ headerName }/>
        <div className="content-body"> 
          <ReactClass{...attributes} />
        </div>
     </div>
    );
  }
});

module.exports = GeneralContent;
