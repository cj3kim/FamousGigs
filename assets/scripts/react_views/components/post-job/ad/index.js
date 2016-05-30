var React = require("react");

var GeneralContent = require("../../../new_general_content");
var PaymentExplanation = require("../payment_explanation");
var NewForm = require("./new_form");
var AdPostForm = React.createClass({
    render: function () {
        return (
          <div className="post-job-section">
              <NewForm />
              <PaymentExplanation />
              <GeneralContent className="why-us" headerName="Why Us?">
                  <ul>
                    <li>Find Great React and JS Devs</li>
                    <li>Access to Developer Network</li>
                    <li>Focus on React</li>
                  </ul>
              </GeneralContent>
          </div>
        );
    }
});

module.exports = AdPostForm;

