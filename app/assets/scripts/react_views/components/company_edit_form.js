var React = require('react');
var Toolbar = require('./toolbar');
var TableHeader = require('./table_header');
var NextButton = require('./next_button');

var $ = require('zepto-browserify').$;
var serializeObject = require('./SerializeObject');
var S3Mixin = require('../../views/S3Mixin');
var Dropzone = require('react-dropzone');
var noticationBox = require('../../views/notification/index');

var CompanyDetails = React.createClass({
  mixins: [S3Mixin],

  componentDidMount: function () {
    var _this = this;

    var form = React.findDOMNode(this);
    this.progress = form.getElementsByTagName('progress')[0];
    this.resourceUrl = "";

    var $form = $(form);
    this.$form = $form;
    $form.on('next-view', function (event) {
      var data = _this.retrieveFormData($form);
      data.logo_url = _this.resourceUrl;
      event.data = data;
      //we continue to let the event bubble up
    });
  },

  retrieveFormData: function ($form) {
    var data = serializeObject($form);
    data = this.cleanFormData(data);

    return data;
  },

  cleanFormData: function (data) {
    delete data[""];
    return data;
  },

  onDrop: function (files) {
    var _this = this;
    var file = files[0];
    var filePath = "company-ads/logos/";


    if (file.size > 2097152) {
      noticationBox._eventInput.trigger('new-notification', {
        message: "File is too big to send."
      });
    } else {
      this.initialUpload(file, filePath)
        .then(function (resourceUrl) {
          _this.resourceUrl = resourceUrl;
          var $image = _this.$form.find('#dropzone-image');
          var image = $image[0];
          image.src = resourceUrl;
          $image.show();
          _this.$form.find('.dropzone-message').hide();
        })
        .catch(function (err) {
          noticationBox._eventInput.trigger('new-notification', {
            message: err.message
          });
        });
    }
  },

  render: function () {
    return (
      <form id='company-edit-form'>
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
            <td colSpan="2"><label for="company_link">Company Link</label></td>
            <td colSpan="4"><input type="text" name="company_link" /></td>
          </tr>

          <tr>
            <td colSpan="2"><label>Logo Upload</label></td>
            <td colSpan="4"><progress value="0" max="100"></progress></td>
          </tr>

          <tr>
            <td colSpan="6">
              <Dropzone onDrop={this.onDrop} style={{width: '100%', height: '150px', border: '1px dotted #41aec2', marginTop: '10px'}} >
                <div className='dropzone-message'>
                  Drop your logo here, or click to select from your computer. 
                  </div>

                <img id="dropzone-image" style={{ display: 'none' }} />

              </Dropzone>
            </td>
          </tr>

          <tr>
            <td colSpan="2"> </td>
            <td colSpan="2"> </td>
            <td colSpan="2"> <NextButton /> </td>
          </tr>
        </table>
      </form>
    );
  }
});

module.exports = CompanyDetails;
