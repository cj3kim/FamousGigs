var React = require("react");

var GeneralContent = require("../../../new_general_content");
var PaymentExplanation = require("../payment_explanation");
var NewForm = require("./new_form");
var AdPostForm = React.createClass({
    render: function () {
        return (
          <div className="post-job">
            <div className="col-1">
               <GeneralContent headerName="Post Job">
                  <NewForm />
               </GeneralContent>
            </div>
            <div className="col-2">
               <PaymentExplanation />
            </div>
          </div>
        );
    }
});

module.exports = AdPostForm;

