var $ = require("zepto-browserify").$;
var React = require("react");
var ReactDOM    = require("react-dom");
var Link = require("react-router").Link
var withRouter = require("react-router").withRouter;
var Toolbar     = require("../../toolbar");
var Dropzone    = require ("react-dropzone");
var GeneralContent = require("../../../new_general_content");
var sgCompanyAdStore = require("../../../../models/singleton/company_ad.js");
var ReactQuill    = require("../../../forms/react_quill");
var TextInput     = require("../../../forms/inputs/text");
var CheckboxInput = require("../../../forms/inputs/checkbox");
var Formsy = require("formsy-react");

var AdEditForm = React.createClass({
  getInitialState: function () {
    //TODO This code allows the component React-Dropzone to work because
    //it relies on findDOMNode to be on React instead of ReactDOM.
    React.findDOMNode = ReactDOM.findDOMNode;
    return {
      canSubmit: true,
    }
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
    var image_preview = sgCompanyAdStore.image_preview;
    this.setImage(image_preview);
  },

  onQuillTextChange: function (text) {
    console.log('==> text', text);
    this.setState({quillText: text });
  },
  setImage: function (resourceUrl) {
    if (resourceUrl) {
      this.temp_refs.$form.find(".dropzone-message").hide();
      var $image = this.temp_refs.$form.find("#dropzone-image");
      var image = $image[0];
      image.src = resourceUrl;
      $image.show();
    }
  },

  onDrop: function (files) {
    var filePath = "company-ads/logos/";
    var fileSizeLimit = 2097152;
    var file = files[0];
    sgCompanyAdStore.files = files;
    sgCompanyAdStore.image_file = file;
    sgCompanyAdStore.image_preview =  file.preview;
    this.setImage(file.preview)
  },
  submit: function (model) {

    model.description = sgCompanyAdStore.get("description") || this.state.quillText || "";
    sgCompanyAdStore.set(model);
    this.props.router.push("/post_job/payment");
  },
  render: function () {

  /*<div className="checkbox-col">*/
  //<label for="contract">Contract?</label>
  //<CheckboxInput name="contract" value={sgCompanyAdStore.get("contract")} />
  /*</div>*/
    return (
     <GeneralContent className="post-job" headerName="Post Job">
         <Formsy.Form  onValidSubmit={this.submit}
                       onInvalidSubmit={this.rotifyFormError}
                       onValid={this.enableButton}
                       inValid={this.disableButton}
                       mapping={this.mapInputs}
                       ref="form"
                       >

               <h3>Job Details </h3>

               <TextInput name="title"
                          label="Title"
                          value={sgCompanyAdStore.get("title") || "Test"}
                          required/>
               <TextInput type="text"
                          name="job_location"
                          label="Location"
                          google_search={true}
                          value={sgCompanyAdStore.get("job_location") || "Oakland, CA, United States"}
                          required />

               <div className="form-row checkboxes">
                 <div className="checkbox-col">
                   <label for="full_time">Full Time?</label>
                   <CheckboxInput name="full_time" value={sgCompanyAdStore.get("full_time")} />
                 </div>


                 <div className="checkbox-col">
                   <label for="remote">Remote?</label>
                   <CheckboxInput name="remote" value={sgCompanyAdStore.get("remote")} />
                 </div>
               </div>


               <label for="description">Description</label>
               <div className="quill-ad-column">
                  <ReactQuill description={sgCompanyAdStore.get("description")} onChange={this.onQuillTextChange}/>
               </div>
               <Toolbar toolbarId="ad-toolbar" />

               <h3> Company Information</h3>
               <TextInput type="text"
                          name="company_name"
                          label="Company Name"
                          value={sgCompanyAdStore.get("company_name") || "WunderCode"}
                          required/>
               <TextInput type="text"
                           name="company_link"
                           label="Company Website"
                           validations="isUrl"
                           validationError="Please enter valid url."
                           value={sgCompanyAdStore.get("company_link")}
                           />
               <TextInput type="text"
                          name="contact_name"
                          label="Contact Name"
                          value={sgCompanyAdStore.get("contact_name") || "Chris Kim"}
                          required/>

               <TextInput type="text"
                          name="contact_email"
                          label="Contact Email"
                          validations="isEmail"
                          validationError="Please enter a valid email address"
                          value={sgCompanyAdStore.get("contact_email") || "cj3kim@gmail.com"}
                          required
                          />
               <label>Logo Upload (200x70 is optimal)</label>
               <Dropzone onDrop={this.onDrop}
                         style={{width: "100%", height: "150px", border: "1px dotted #41aec2", marginTop: "10px"}} >
                 <div className="dropzone-message"> Drop your logo here, or click to select from your computer.  </div>

                 <img id="dropzone-image" style={{ display: "none" }} />
               </Dropzone>
               <button className="checkout-btn"
                       type="submit"
                       disabled={!this.state.canSubmit} >
                 <span>Review and Checkout</span>
               </button>
          </Formsy.Form>
      </GeneralContent>
    );
  },
  notifyFormError: function (model, resetForm, invalidateForm) {
    function emptyError(input_name, label_name, model, accum) {
      var val = model[input_name];
      var message = val === undefined || val.length === 0 ? "Please enter a " + label_name : "";
      return message;
    }

    var errors = Object.keys(model).reduce(function (prev, curr) {
      var errorMessage;
      switch (curr) {
        case "title":
          errorMessage = emptyError("title", "title", model, prev);
          break;
        case "job_location":
          errorMessage = emptyError("job_location", "location", model, prev);
          break;
        case "company_name":
          errorMessage = emptyError("company_name", "company name", model, prev);
          break;
        case "contact_name":
          errorMessage = emptyError("contact_name", "contact name", model, prev);
          break;
        case "contact_email":
          errorMessage = emptyError("contact_email", "contact email", model, prev);
          break;
        default:
      }
      prev[curr] = errorMessage;
      return prev;
    }, {});

    invalidateForm(errors);
    this.canSubmit();
  },

  displayFormErrorNotice: function () {
    var message = "There are errors in the form."
    var formError =  (<div className="form-error"><span>{message}</span></div>);
    return this.state.formSubmissionError ? formError : null;
  },

});

module.exports = withRouter(AdEditForm);
