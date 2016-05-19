var $ = require("zepto-browserify").$;
var React = require("react");
var ReactDOM    = require("react-dom");
var Quill = require("quill");
var Link = require("react-router").Link
var withRouter = require("react-router").withRouter;

var Toolbar     = require("../../toolbar");
var TableHeader = require("../../table_header");
var Dropzone    = require ("react-dropzone");

var S3Mixin         = require("../../../../views/S3Mixin");
var DropzoneMixin   = require("../../../dropzone_mixin");
var sgCompanyAdStore = require("../../../../models/singleton/company_ad.js");

var ReactQuill = require("../../../forms/react_quill");
var TextInput     = require("../../../forms/inputs/text");
var CheckboxInput = require("../../../forms/inputs/checkbox");
var Formsy = require("formsy-react");

var AdEditForm = React.createClass({
  mixins: [S3Mixin, DropzoneMixin],
  getInitialState: function () {
    return { canSubmit: false }
  },
  mapInputs: function (inputs) {
    return inputs;
  },
  enableButton: function () {
    this.setState({ canSubmit: true });
  },
  disableButton: function () {
    this.setState({canSubmit: false });
  },
  componentDidMount: function () {
    var _this = this;
    var form  = ReactDOM.findDOMNode(this);
    var $form = $(form);

    this.temp_refs = {};
    this.temp_refs.$form = $form;
  },

  onQuillTextChange: function (text) {
    this.setState({quillText: text });
    console.log('==> this.state', this.state);
  },

  setImage: function (resourceUrl) {
    this.resourceUrl = resourceUrl;
    this.temp_refs.$form.find(".dropzone-message").hide();
    var $image = this.temp_refs.$form.find("#dropzone-image");
    var image = $image[0];
    image.src = resourceUrl;

    $image.show();
  },
  onDrop: function (files) {
    var filePath = "company-ads/logos/";
    var fileSizeLimit = 2097152;
    var file = files[0];
    sgCompanyAdStore.files = files;
    this.setImage(file.preview)
    //this.dropAndLoad(files, filePath, fileSizeLimit,  this.setImage);
  },
  submit: function (model) {
    console.log('==> model', model);
    sgCompanyAdStore.set(model);
    this.props.router.push("/post_job/payment");
  },
  render: function () {
    //<td colSpan="4"><progress value="0" max="100"></progress></td>
    return (
     <Formsy.Form  onValidSubmit={this.submit}
                   onValid={this.enableButton}
                   onInvalid={this.disableButton}
                   mapping={this.mapInputs} >
             <h3>Job Details </h3>

             <TextInput name="title" label="Title" />
             <TextInput type="text" name="job_location" label="Location" />

             <div className="form-row checkboxes">
               <div className="checkbox-col">
                 <label for="full_time">Full Time?</label>
                 <CheckboxInput type="checkbox" name="full_time" />
               </div>
               <div className="checkbox-col">
                 <label for="contract">Contract?</label>
                 <CheckboxInput type="checkbox" name="contract" />
               </div>


               <div className="checkbox-col">
                 <label for="remote">Remote?</label>
                 <CheckboxInput type="checkbox" name="remote" />
               </div>

             </div>


             <label for="description">Description</label>
             <div className="quill-ad-column">
                <ReactQuill onChange={this.onQuillTextChange}/>
             </div>
             <Toolbar toolbarId="ad-toolbar" />

             <h3> Company Information</h3>
             <TextInput type="text" name="company_name" label="Company Name"/>
             <TextInput type="text" name="company_link" label="Company Website" validations="isUrl" />
             <TextInput type="text" name="contact_name" label="Contact Name" />

             <TextInput type="text" name="contact_email"
                                    label="Contact Email"
                                    validations="isEmail"
                                    validationError="Please format your email correctly"
                                    />
             <label>Logo Upload (200x70 is optimal)</label>
             <Dropzone onDrop={this.onDrop} style={{width: "100%", height: "150px", border: "1px dotted #41aec2", marginTop: "10px"}} >
               <div className="dropzone-message"> Drop your logo here, or click to select from your computer.  </div>
               <img id="dropzone-image" style={{ display: "none" }} />
             </Dropzone>
             <button className="checkout-btn"
                     type="submit"
                     disabled={!this.state.canSubmit} >
               <span>Review and Checkout</span>
             </button>
      </Formsy.Form>
    );
  }
});

module.exports = withRouter(AdEditForm);
