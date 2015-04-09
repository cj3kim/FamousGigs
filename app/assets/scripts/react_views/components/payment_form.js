var React = require('react');
var $ = require('zepto-browserify').$;
var TableHeader = require('./table_header');


Stripe.setPublishableKey('pk_test_8vofNFraEETbkErpKImun5jZ');

var serializeObject = require('./SerializeObject');

var PaymentForm = React.createClass({
  handleSubmit: function (event) {
    event.preventDefault();

    var $form = $('#payment-form')
    var obj = serializeObject($form);
    console.log('handle-submit');
    console.log(obj);

    // Disable the submit button to prevent repeated clicks
    //$form.find('button').prop('disabled', true);
    Stripe.card.createToken(obj, this.stripeResponseHandler);
    // Prevent the form from submitting with the default action
  },

  stripeResponseHandler: function (status, response) {
    var $form = $('#payment-form');

    if (response.error) {
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
      var token = response.id;
      function success(response) {
        var $form = $('#payment-form');
        $form.trigger('next-view');
      }
      $.post('/payment', {stripeToken: token}, success);
    }
  },
  render: function () {
    return (
      <form id="payment-form" onSubmit={this.handleSubmit} action="/payment">
        <span className="payment-errors"> </span>
        <table>
          <TableHeader amount="6" />
          <tr>
            <td colSpan="2"><label for="number">Credit Card No.</label> </td>
            <td colSpan="4"><input type="text" name="number" data-stripe="number"/></td>
            </tr>

          <tr>
            <td colSpan="2"><label>Expiration (MM/YYYY)</label></td>
            <td colSpan="2">
                <input className='month' type="text"  name="exp_month" data-stripe="exp-month"/>
                <span>/</span>
                <input className='year'  type="text"  name="exp_year"  data-stripe="exp-year"/>
                </td>
            <td colSpan="1"><label for="cvc">CVC</label></td>
            <td colSpan="1"><input type="text" name="cvc" /></td>

            </tr>

          <tr>
            <td colSpan="5"></td>
            <td colSpan="1"><button type="submit">Submit</button></td>
            </tr>
        </table>
      </form>
    );
  }
});

module.exports = PaymentForm;
