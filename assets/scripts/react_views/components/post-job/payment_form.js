var React       = require("react");
var ReactDOM    = require("react-dom");
var $           = require("zepto-browserify").$;
var sgCompanyAdStore = require("../../../models/singleton/company_ad.js");
var TextInput     = require("../../forms/inputs/text");

var TableHeader = require("../table_header");
var serializeObject = require("../SerializeObject");

Stripe.setPublishableKey("pk_test_8vofNFraEETbkErpKImun5jZ");

var PaymentForm = React.createClass({
  getInitialState: function () {
    return { canSubmit: true }
  },

  mapInputs: function (inputs) {
    var regex = /(\d\d)\/(\d\d\d\d)/g;

    var expiration_month_year = inputs.expiration_month_year || "";
    var matches = regex.exec(expiration_month_year);
    delete inputs["expiration_month_year"]
    if (matches) {
      var month = matches[1] || "";
      var year  = matches[2] || "";
      inputs.exp_month = month;
      inputs.exp_year  = year;
    }
    return inputs;
  },
  enableButton: function () {
    this.setState({ canSubmit: true });
  },
  disableButton: function () {
    this.setState({canSubmit: false });
  },
  componentDidMount: function () {
    var $form = $(ReactDOM.findDOMNode(this));
    this.temp_refs = {}
    this.temp_refs.$form = $form;
  },
  submit: function (event) {
    this.disableButton();
    var formModelData = this.refs.form.getModel();
    Stripe.card.createToken(formModelData, this.stripeResponseHandler);
  },

  stripeResponseHandler: function (status, response) {
    var $form   = this.temp_refs.$form;
    if (response.error) {
      $form.find(".payment-errors").text(response.error.message);
      $form.find("button").prop("disabled", false);
    } else {
      var token = response.id;
      sgCompanyAdStore.set({stripe_token: token});

      var postObj = sgCompanyAdStore.attributes;
      $.post('/company_ads/create', postObj, function () {
          console.log("Successfully created the ad.");
      });
    }
  },
  notifyFormError: function (model, resetForm, invalidateForm) {
  },
  render: function () {
    return (
     <Formsy.Form  className="payment-form"
                   onValidSubmit={this.submit}
                   onInvalidSubmit={this.notifyFormError}
                   onValid={this.enableButton}
                   inValid={this.disableButton}
                   ref="form"
                   mapping={this.mapInputs} >
        <h3>Payment Details</h3>
        <div className="payment-details row">
          <div className="costs">
            <div className="cost">
              <span className="inventory">1x Post</span> <span className="price">$50</span>
            </div>
            <div className="cost">
              <span className="inventory">Total:</span><span className="price">$50</span>
            </div>
          </div>
        </div>

        <h3>Payment Information</h3>
        <div className="card-types row">
          <label for="number">Card Type</label> 
          <img alt={"Accept Credit Cards Visa MasterCard American Express Discover"} src={"http://www.instamerchant.com/cards4.gif"}  />
        </div>

          <TextInput name="cardholder_name" label="Cardholder Name" />
          <TextInput name="number"
                     label="Card Number"
                     validations={{
                       isNumeric: true,
                       maxLength: 19
                     }}
                     validationError="Please enter valid card number."
                     required/>

        <div className="exp-date-and-cvc row">
          <TextInput className="exp-date"
                     name="expiration_month_year"
                     label="Expiration (MM/YYYY)"
                     validations={{
                       checkExpiration: function (values, value) {
                         var re = /\d\d\/\d\d\d\d/ig;
                         return re.test(value);
                       }
                     }}
                     validationError="Please enter valid expiration date."
                     required/>
          <TextInput className="_cvc" 
                     name="cvc" 
                     label="CVC" 
                     validations={{
                       isNumeric: true
                     }}
                     validationError="Please enter numbers."
                     required/>
        </div>

       <button className="pay-btn"
               type="submit"
               disabled={!this.state.canSubmit} >
         <span>Complete Post</span>
       </button>
      </Formsy.Form>
    );
  }
});

module.exports = PaymentForm;
