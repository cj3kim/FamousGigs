var React = require('react');

var FormContent = React.createClass({
  render: function () {
    var ReactClass = this.props.reactClass; 
    var headerName = this.props.headerName;
    var id = this.props.id ? this.props.id : "";

    return (
      <div id={id} className="form-content">
        <div className="content-header">
          <span>{ headerName }</span>
        </div>
        <div className="content-body">
          <ReactClass {...this.props}/>
        </div>
     </div>
    );
  }
});

module.exports = FormContent;
