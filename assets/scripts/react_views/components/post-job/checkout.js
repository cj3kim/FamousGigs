var React       = require("react");
var ReactDOM    = require("react-dom");
var Quill       = require("quill");
var FormContent = require("../../form_content");
var PaymentForm = require("./payment_form");
var GeneralContent = require("../../new_general_content");

var $ = require("zepto-browserify").$;

var Checkout = React.createClass({
  render: function () {
    return (
      <div className="payment-checkout">
        <GeneralContent headerName="Review and Checkout" >
          <PaymentForm />
        </GeneralContent>
      </div>
    );
  }
});

module.exports = Checkout;
