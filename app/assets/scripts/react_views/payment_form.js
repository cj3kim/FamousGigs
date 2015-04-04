var React = require('react');
var $ = require('zepto-browserify').$;

Stripe.setPublishableKey('pk_test_8vofNFraEETbkErpKImun5jZ');

function serializeObject($form) {
   var o = {};
   var a = $form.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
}

var PaymentForm = React.createClass({
  handleSubmit: function (event) {
    event.preventDefault();
    console.log(event);

    var $form = $('#payment-form')
    var obj = serializeObject($form);

    // Disable the submit button to prevent repeated clicks
    //$form.find('button').prop('disabled', true);
    Stripe.card.createToken(obj, this.stripeResponseHandler);
    // Prevent the form from submitting with the default action
    return false;
  },

  stripeResponseHandler: function (status, response) {
    console.log(response);
    var $form = $('#payment-form');

    if (response.error) {
      // Show the errors on the form
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
      // response contains id and card, which contains additional card details
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server

      $.post('/payment', { stripeToken: token}, function(response){
        console.log(response);
      });

    }
  },
  render: function () {
    return (
      <div  className="box stop-gap-div">
        <span className="payment-erros"> </span>
        <div className="title row">
          <span>Credit Card</span>
        </div>

        <div id="" className="form row" onSubmit={ this.handleSubmit }>
          <form id="payment-form" action="/payment">
            <table border="0">
              <tr>
                <td>
                  <label for="number">Credit Card No.</label>
                  <input type="text" name="number" data-stripe="number"/>
                </td>
              </tr>

              <tr>
                <td>
                  <label for="cvc">CVC</label> <input type="text" name="cvc" />
                </td>
              </tr>

              <tr>
                <td className='expiration-date'>
                  <label>Expiration (MM/YYYY)</label>
                  <input className='month' type="text"  name="exp_month" data-stripe="exp-month"/>/
                  <input className='year'  type="text"  name="exp_year"  data-stripe="exp-year"/>
                </td>
              </tr> 

              <tr>
                <td><button type="submit">Submit Payment</button></td>
              </tr>

            </table>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = PaymentForm;
