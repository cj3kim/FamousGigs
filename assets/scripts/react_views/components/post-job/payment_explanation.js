var React = require('react');
var GeneralContent = require("../../new_general_content");
var PaymentExplanation = React.createClass({
  render: function () {
    return (
      <GeneralContent className='payment-explanation' headerName="Simple Pricing">
        <ul>
          <li>$50 for Full-Time/Freelance Posts</li>
          <li>Active for Two Months</li>
          <li>Your Ad Blasted to Our Subscribers</li>
        </ul>
      </GeneralContent>
    );
  }
});

module.exports = PaymentExplanation;

