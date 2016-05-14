var React = require('react');

var PaymentExplanation = React.createClass({
  render: function () {
    return (
      <div className='payment-explanation'>
        <span> The price to post is $50 for any position. All posts will stay up for a month from the initial post date.</span>
      </div>
    );
  }
});

module.exports = PaymentExplanation;

