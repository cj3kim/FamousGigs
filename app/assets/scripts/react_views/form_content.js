var React = require('react');
var ContentHeader = require('./components/content_header');


var FormContent = React.createClass({
  render: function () {
    var ReactClass = this.props.reactClass; 
    var headerName = this.props.headerName;

    return (
      <div className="form-content stop-gap-div">
        <ContentHeader headerName={ headerName }/>
        <div className="content-body"> 
          <ReactClass />
        </div>
     </div>
    );
  }
});

module.exports = FormContent;
