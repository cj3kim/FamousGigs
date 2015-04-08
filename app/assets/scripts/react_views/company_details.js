var React = require('react');
var ContentHeader =  require('./components/content_header');
var CompanyEditForm = require('./components/company_edit_form');

var CompanyDetails = React.createClass({
  render: function () {
    return (
      <div className="form-content stop-gap-div">
        <ContentHeader headerName={"Company Details"}/>
        <CompanyEditForm />
     </div>
    );
  }
});

module.exports = CompanyDetails;
