var React = require('react');
var AdEditForm = require('./components/ad_edit_form');

var AdForm = React.createClass({
  render: function () {
    return (
      <div className="form-content stop-gap-div">
        <div className="content-header">
          <span>Ad Form</span>
        </div>

        <AdEditForm />
     </div>
    );
  }
});

module.exports = AdForm;

//<tr className='normal'>
  //<td><label for="company_logo">Company Logo</label> </td>
  //<td><input type="file" name="company_logo" /></td>
//</tr>

//<tr className='normal'>
  //<td><img src="http://placehold.it/260x150" /></td>
//</tr>

