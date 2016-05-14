var React = require('react');

var LastButton = require('./last_button');

var PaymentThanks = React.createClass({
  render: function () {
    return (
      <div id='payment-thank-you'>
        <span className='complete'> Payment Complete. </span>

        <span className='common'> Thank you for posting. Please check your email for confirmation. </span>

        <LastButton text="Return to Posts" />
      </div>
    );
  }
});

module.exports = PaymentThanks;
