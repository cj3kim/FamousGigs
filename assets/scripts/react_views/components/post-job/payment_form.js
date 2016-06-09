var React       = require("react");
var ReactDOM    = require("react-dom");
var withRouter = require("react-router").withRouter;
var $           = require("zepto-browserify").$;
var sgCompanyAdStore = require("../../../models/singleton/company_ad.js");
var TextInput     = require("../../forms/inputs/text");
var GeneralContent = require("../../new_general_content");

Stripe.setPublishableKey("pk_test_kfMDX6TYhww4CZBhU8do5di6");
Formsy.addValidationRule("expiration_date", function (values, value) {
    var regex = /(\d\d)\/(\d\d\d\d)/g;
    return regex.test(value);
});

// usage
var PaymentForm = React.createClass({
  getInitialState: function () {
    return {
      canSubmit: true,
      stripe: {
        hasError: false,
        errorData: null,
        successData: null,
      }
    }
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
  submit: function (modelData) {
    this.disableButton();
    var formModelData = this.refs.form.getModel();
    Stripe.card.createToken(formModelData, this.stripeResponseHandler);
  },

  stripeResponseHandler: function (status, response) {
    var _this = this;
    if (response.error) {
      this.setState({ stripe: { hasError: true, errorData: response.error } });
      this.enableButton();
    } else {
      var token = response.id;
      sgCompanyAdStore.set({stripe_token: token});
      _this.props.router.push("post_job/payment/complete");
    }
  },
  notifyFormError: function (model, resetForm, invalidateForm) {
  },
  render: function () {
    var stripeError = this.state.stripe.hasError;

    return (
      <GeneralContent className="payment-checkout" headerName="Review and Checkout" >
         <Formsy.Form  className="payment-form"
                       onValidSubmit={this.submit}
                       onInvalidSubmit={this.notifyFormError}
                       onValid={this.enableButton}
                       inValid={this.disableButton}
                       ref="form"
                       mapping={this.mapInputs} >

              <div className={stripeError ? "": "hidden"}><span className="input-error">{stripeError ? "*" + this.state.stripe.errorData.message : ""}</span></div>
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

              <h3>Payment Information </h3>
              <div className="card-types row">
                <label for="number">Card Type</label>
                <img alt={"Accept Credit Cards Visa MasterCard American Express Discover"} src={"http://www.instamerchant.com/cards4.gif"}  />
              </div>

                <TextInput name="cardholder_name" label="Cardholder Name" />
                <TextInput name="number"
                           label="Card Number"
                           validations="isNumeric,maxLength:19"
                           validationError="Please enter valid card number."
                           value="4242424242424242"
                           required/>

              <div className="exp-date-and-cvc row">
                <TextInput className="exp-date"
                           name="expiration_month_year"
                           label="Expiration (MM/YYYY)"
                           validations="expiration_date"
                           validationError="Please enter valid date."
                           value="12/2017"
                           required/>
                <TextInput className="_cvc"
                           name="cvc"
                           label="CVC"
                           validationError="Please enter numbers."
                           value="123"
                           required/>
              </div>

             <button className="pay-btn" type="submit" disabled={!this.state.canSubmit} >
               <span>Complete Post</span>
             </button>
        </Formsy.Form>
      </GeneralContent>
    );
  }
});

module.exports = withRouter(PaymentForm);
