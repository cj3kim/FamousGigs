var React = require("react");
var GeneralContent = require("../../../new_general_content");
var PaymentExplanation = require("../payment_explanation");
var WhyUs = require("../why_us");
var NewForm = require("./new_form");

module.exports = React.createClass({
  displayName: "PostJob",
  render: function () {
    return (
      <div className="post-job-section">
          <NewForm />
          <PaymentExplanation />
          <WhyUs />
      </div>
    );
  }
});
