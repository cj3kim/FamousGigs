var React = require("react");
var GeneralContent = require("../../../new_general_content");
var PaymentForm = require("../payment_form");
var PaymentExplanation = require("../payment_explanation");
var WhyUs = require("../why_us");

module.exports = React.createClass({
    displayName: "ReviewAndCheckout",
    render: function () {
        return (
          <div className="post-job-section">
              <PaymentForm />
              <PaymentExplanation />
              <WhyUs />
          </div>
        );
    }
});


