var React = require('react');
var ContentHeader = require('./components/content_header');


var FormContent = React.createClass({
  render: function () {
    var ReactClass = this.props.reactClass; 
    var headerName = this.props.headerName;
    var id = this.props.id ? this.props.id : "";

    return (
      <div id={id} className="form-content">
        <ContentHeader headerName={ headerName }/>
        <div className="content-body">
          <ReactClass {...this.props}/>
        </div>
     </div>
    );
  }
});

module.exports = FormContent;
