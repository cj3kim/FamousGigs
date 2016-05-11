var React       = require("react");
var ReactDOM    = require("react-dom");
var Toolbar     = require("../toolbar");
var TableHeader = require("../table_header");
var NextButton  = require("../next_button");

var $               = require("zepto-browserify").$;
var Dropzone        = require("react-dropzone");

var serializeObject = require("../SerializeObject");
var S3Mixin         = require("../../../views/S3Mixin");
var noticationBox   = require("../../../views/notification/index");
var DropzoneMixin   = require("../../dropzone_mixin");

var CompanyDetails = React.createClass({
  mixins: [S3Mixin, DropzoneMixin],

  componentDidMount: function () {
    var _this = this;
    var form         = ReactDOM.findDOMNode(this);
    this.progress    = form.getElementsByTagName("progress")[0];
    this.resourceUrl = "";

    var $form = $(form);
    this.$form = $form;
    $form.on("next-view", function (event) {
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

  setImage: function (resourceUrl) {
    this.resourceUrl = resourceUrl;
    var $image = this.$form.find("#dropzone-image");
    var image = $image[0];
    image.src = resourceUrl;
    $image.show();
    this.$form.find(".dropzone-message").hide();

  },
  onDrop: function (files) {
    var filePath = "company-ads/logos/";
    var fileSizeLimit = 2097152;
    this.dropAndLoad(files, filePath, fileSizeLimit,  this.setImage);
  },

  render: function () {
    return (
      <form id="company-edit-form">
        <table border="0">

          <tbody>

          <TableHeader amount={6} />

          <tr>
            <td colSpan="2"><label for="company_name">Company Name</label></td>
            <td colSpan="4"><input type="text" name="company_name" /></td>
          </tr>

          <tr>
            <td colSpan="2"><label for="company_link">Company Website</label></td>
            <td colSpan="4"><input type="text" name="company_link" /></td>
          </tr>

          <tr>
            <td colSpan="2"> <label for="contact_name">Contact Name</label> </td>
            <td colSpan="4"> <input type="text" name="contact_name" /> </td>
          </tr>

          <tr>
            <td colSpan="2"> <label for="contact_email">Contact Email</label> </td>
            <td colSpan="4"> <input type="text" name="contact_email" /> </td>
          </tr>

          <tr>
            <td colSpan="2"><label>Logo Upload</label></td>
            <td colSpan="4"><progress value="0" max="100"></progress></td>
          </tr>

          <tr>
            <td colSpan="6">
              <Dropzone onDrop={this.onDrop} style={{width: "100%", height: "150px", border: "1px dotted #41aec2", marginTop: "10px"}} >
                <div className="dropzone-message">
                  Drop your logo here, or click to select from your computer.
                  </div>

                <img id="dropzone-image" style={{ display: "none" }} />

              </Dropzone>
            </td>
          </tr>

          <tr className="beefy-cols">
            <td colSpan="3"></td>
            <td colSpan="3">
              <button className="checkout-btn" type="submit">
                <span>Review and Checkout</span>
              </button>
              </td>
          </tr>

          </tbody>
        </table>
      </form>
    );
  }
});

module.exports = CompanyDetails;
