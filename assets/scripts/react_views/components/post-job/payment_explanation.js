var React = require('react');
var GeneralContent = require("../../new_general_content");
var PaymentExplanation = React.createClass({
  render: function () {
    return (
      <GeneralContent className='payment-explanation' headerName="Pricing">
        <span> The price to post is $50 for any position. All posts will stay up for a month from the initial post date.</span>
      </GeneralContent>
    );
  }
});

module.exports = PaymentExplanation;

