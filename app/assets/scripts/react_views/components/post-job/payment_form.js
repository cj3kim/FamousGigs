var React = require("react");
var ReactDOM    = require("react-dom");
var $ = require("zepto-browserify").$;
var TableHeader = require("../table_header");


Stripe.setPublishableKey("pk_test_8vofNFraEETbkErpKImun5jZ");

var serializeObject = require("../SerializeObject");

var PaymentForm = React.createClass({
  handleSubmit: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var $form = $(ReactDOM.findDOMNode(this));
    var obj  = serializeObject($form);

    Stripe.card.createToken(obj, this.stripeResponseHandler);
  },

  stripeResponseHandler: function (status, response) {
    var $form = $("#payment-form");

    if (response.error) {
      $form.find(".payment-errors").text(response.error.message);
      $form.find("button").prop("disabled", false);
    } else {
      var token = response.id;

      $form.trigger("stripe-payment",[{stripe_token: token}]);
    }
  },
  render: function () {
    return (
      <form id="payment-form" onSubmit={this.handleSubmit}>
        <span className="payment-errors"> </span>
        <table>
          <tbody>
          <TableHeader amount="6" />

          <tr className="header">
            <td colSpan="6">Payment Details</td>
          </tr>

          <tr className="payment-details">
            <td colSpan="2"><label for="number">1x Post</label> </td>
            <td colSpan="1">$50</td>
            </tr>

          <tr className="subtotal-line payment-details">
            <td colSpan="2"><label for="number">Subtotal: </label> </td>
            <td colSpan="1">$50</td>
            </tr>
          <tr>
            <td colSpan="2"><label for="number">Total: </label> </td>
            <td colSpan="4">$50</td>
            </tr>

          <tr className="header">
            <td colSpan="6">Payment Information</td>
          </tr>
          <tr>
            <td colSpan="2"><label for="number">Card Type</label> </td>
            <td colSpan="4">
                <img alt={"Accept Credit Cards Visa MasterCard American Express Discover"} src={"http://www.instamerchant.com/cards4.gif"}  />
            </td>
            </tr>
          <tr>
            <td colSpan="2"><label for="number">Cardholder Name</label> </td>
            <td colSpan="4"><input type="text" name="number" /></td>
            </tr>
          <tr>
            <td colSpan="2"><label for="number">Card Number</label> </td>
            <td colSpan="4"><input type="text" name="number" data-stripe="number"/></td>
            </tr>

          <tr>
            <td colSpan="2"><label>Expiration (MM/YYYY)</label></td>
            <td colSpan="4">
                <input className="month" type="text"  name="exp_month" data-stripe="exp-month"/>
                <span> / </span>
                <input className="year"  type="text"  name="exp_year"  data-stripe="exp-year"/>
                </td>
            </tr>
          <tr>
            <td colSpan="2"><label for="cvc">CVC</label></td>
            <td colSpan="1"><input type="text" name="cvc" /></td>
            </tr>

          <tr>
            <td colSpan="3"></td>
            <td colSpan="3">
              <button className="pay-btn" type="submit">
                <span> Complete Post </span>
              </button>
              </td>
          </tr>

          </tbody>
        </table>
      </form>
    );
  }
});

module.exports = PaymentForm;
