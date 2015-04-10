var React = require('react');
var Quill = require('quill');
var Toolbar = require('./toolbar');
var TableHeader = require('./table_header');
var NextButton = require('./next_button');

var $ = require('zepto-browserify').$;
var serializeObject = require('./SerializeObject');

var CompanyDetails = React.createClass({
  componentDidMount: function () {
    var _this = this;

    var form = React.findDOMNode(this);
    var $form = $(form);

    var div = form.getElementsByClassName('quill-ad-form')[0];
    var fullEditor = new Quill(div, {
      styles: {
        '.ql-editor': {
          'font-family': "Helvetica, 'Arial', san-serif;",
        }
      },
      theme: 'snow'
    });

    $form.on('next-view', function (event) {
      var data = _this.retrieveFormData($form, fullEditor);
      event.data = data;
      //we continue to let the event bubble up
    });
  },

  retrieveFormData: function ($form, quillEditor) {
    var data = serializeObject($form);
    var html = quillEditor.getHTML();
    data.additional_notes = html;
    data = this.cleanFormData(data);

    return data;
  },

  cleanFormData: function (data) {
    delete data[""];
    return data;
  },

  render: function () {
    return (
      <form>
        <table border="0">
          <TableHeader amount={6} />

          <tr>
            <td colSpan="2"> <label for="contact_name">Contact Name</label> </td>
            <td colSpan="4"> <input type="text" name="contact_name" /> </td>
          </tr>

          <tr>
            <td colSpan="2"> <label for="contact_email">Contact Email</label> </td>
            <td colSpan="4"> <input type="text" name="contact_email" /> </td>
          </tr>

          <tr>
            <td colSpan="2"><label for="company_name">Company Name</label></td>
            <td colSpan="4"><input type="text" name="company_name" /></td>
          </tr>

          <tr>
            <td colSpan="2"><label for="company_site">Company Link</label></td>
            <td colSpan="4"><input type="text" name="company_site" /></td>
          </tr>

          <tr>
            <td colSpan="6"><label>Additional Notes</label></td>
          </tr>

          <tr className='quill-row'>
            <td colSpan="6" className='quill-ad-column'><div className='quill-ad-form'></div></td>
          </tr>

          <tr>
            <td colSpan="2">  </td>
            <td colSpan="2"> </td>
            <td colSpan="2"> <NextButton /> </td>
          </tr>
        </table>
      </form>
    );
  }
});

module.exports = CompanyDetails;
