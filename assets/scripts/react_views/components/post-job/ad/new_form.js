var React = require("react");
var ReactDOM    = require("react-dom");
var Quill = require("quill");
var Link = require("react-router").Link
var withRouter = require("react-router").withRouter;

var serializeObject = require('../../SerializeObject');
var Toolbar     = require("../../toolbar");
var TableHeader = require("../../table_header");
var Dropzone    = require ("react-dropzone");

var $ = require("zepto-browserify").$;
var S3Mixin         = require("../../../../views/S3Mixin");
var noticationBox   = require("../../../../views/notification/index");
var DropzoneMixin   = require("../../../dropzone_mixin");

var sgCompanyAdStore = require("../../../../models/singleton/company_ad.js");


var AdEditForm = React.createClass({
  mixins: [S3Mixin, DropzoneMixin],

  componentDidMount: function () {
    var _this = this;
    var form  = ReactDOM.findDOMNode(this);
    var div   = form.getElementsByClassName('quill-ad-form')[0];
    var $form = $(form);
    var quillEditor = this.generateQuillForm(div);

    this.setState({
      $form: $form,
      quillEditor: quillEditor,
    });
  },

  generateQuillForm: function (div) {
      return new Quill(div, {
        styles: {
          ".ql-editor": { "font-family": "Helvetica, 'Arial', san-serif;" }
        },
        modules: { "toolbar": { container: "#ad-toolbar" }, },
        theme: "snow"
      });
  },

  retrieveFormData: function ($form, quillEditor) {
    var data = serializeObject($form);
    var html = quillEditor.getHTML();
    data.description = html;
    data = this.cleanFormData(data);

    return data;
  },

  cleanFormData: function (data) {
    delete data[""];
    return data;
  },

  setImage: function (resourceUrl) {
    this.resourceUrl = resourceUrl;
    var $image = this.state.$form.find("#dropzone-image");
    var image = $image[0];
    image.src = resourceUrl;
    $image.show();
    this.state.$form.find(".dropzone-message").hide();

  },
  onDrop: function (files) {
    var filePath = "company-ads/logos/";
    var fileSizeLimit = 2097152;
    var file = files[0];
    console.log('==> files', files);
    this.setImage(file.preview)
    //this.dropAndLoad(files, filePath, fileSizeLimit,  this.setImage);
  },
  updateCompanyAdStore: function (evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var state       = this.state;
    var quillEditor = state.quillEditor;
    var $form       = state.$form;
    var formData    = this.retrieveFormData($form, quillEditor);

    sgCompanyAdStore.set(formData);
    this.props.router.push("/post_job/payment");
  },
  render: function () {
    //<td colSpan="4"><progress value="0" max="100"></progress></td>
    return (
      <form onSubmit={this.updateCompanyAdStore} >
        <table border="0">
          <tbody>
            <TableHeader amount={6} />
            <tr className="header">
              <td colSpan="6">Job Details</td>
            </tr>
            <tr>
              <td colSpan="1"> <label for="title">Title</label> </td>
              <td colSpan="5"> <input type="text" name="title" /> </td>
            </tr>
            <tr >
              <td colSpan="6" className='description' ><label for="description">Description</label></td>
            </tr>

            <tr className='quill-row'>
              <td colSpan="6" className='quill-ad-column'><div className='quill-ad-form'></div></td>
            </tr>

            <tr className='no-padding'>
              <td colSpan="6"><Toolbar toolbarId="ad-toolbar" /></td>
            </tr>

            <tr >
              <td colSpan="1"><label for="job_location">Location</label></td>
              <td colSpan="5"><input type="text" name="job_location" /></td>
            </tr>

            <tr className="checkboxes">
              <td colSpan="1"> <label for="full_time">Full Time?</label> </td>
              <td colSpan="1"> <input type="checkbox" name="full_time" /> </td>
              <td colSpan="1"> <label for="contract">Contract?</label> </td>
              <td colSpan="1"> <input type="checkbox" name="contract" /> </td>
              <td colSpan="1"> <label for="remote">Remote?</label> </td>
              <td colSpan="1"> <input type="checkbox" name="remote" /> </td>
            </tr>

            <tr className="header">
              <td colSpan="6">Company Information</td>
            </tr>

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
              <td colSpan="6"><label>Logo Upload (200x70 is optimal)</label></td>
            </tr>

            <tr>
              <td colSpan="6">
                <Dropzone onDrop={this.onDrop} style={{width: "100%", height: "150px", border: "1px dotted #41aec2", marginTop: "10px"}} >
                  <div className="dropzone-message"> Drop your logo here, or click to select from your computer.  </div>

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

module.exports = withRouter(AdEditForm);
