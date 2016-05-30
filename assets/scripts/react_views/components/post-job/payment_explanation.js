var React = require('react');
var GeneralContent = require("../../new_general_content");
var PaymentExplanation = React.createClass({
  render: function () {
    return (
      <GeneralContent className='payment-explanation' headerName="Simple Pricing">
        <ul>
          <li>$50 for full-time/freelance</li>
          <li>active for two months</li>
          <li>emailed to our subscribers</li>
        </ul>
      </GeneralContent>
    );
  }
});

module.exports = PaymentExplanation;

