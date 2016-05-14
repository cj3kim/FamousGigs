var React       = require("react");
var ReactDOM    = require("react-dom");
var Quill       = require("quill");
var FormContent = require("../../form_content");
var PaymentForm = require("./payment_form");

var $ = require("zepto-browserify").$;

var Checkout = React.createClass({
  render: function () {
    return (
      <div className="payment-checkout">
        <FormContent headerName="Review and Checkout" reactClass={PaymentForm} />
      </div>
    );
  }
});

module.exports = Checkout;
