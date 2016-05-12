var React = require("react");

var FormContent = require("../../../form_content");
//var AdEditForm  = require("./ad_edit_form");
//var CompanyForm = require("../company_edit_form");
//var PaymentForm = require("../payment_form");
var PaymentExplanation = require("../payment_explanation");


var NewForm = require("./new_form");
var AdPostForm = React.createClass({
    render: function () {
        return (
          <div className="post-job">
            <div className="col-1">
               <FormContent headerName="Post Job"     reactClass={NewForm} />
            </div>

            <div className="col-2">
               <PaymentExplanation />
            </div>
          </div>


        );
    }
});

module.exports = AdPostForm;

