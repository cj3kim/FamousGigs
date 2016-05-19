var Formsy = require("formsy-react");
var React = require("react");

var Input = React.createClass({
  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    var inputType = this.props.type;
    var input     = event.currentTarget.value;
    this.setValue(input);
  },


  render: function () {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.showRequired() ? "required" : this.showError() ? "error" : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();
    var defaultType  = "text"

    return (
      <div className={className}>
        <div className="form-row">
            <div className="col">
                <label for={this.props.name}>{this.props.label}</label>
                <input type={this.props.type || defaultType} onChange={this.changeValue} value={this.getValue()}/>
            </div>
        </div>
      </div>
    );
  }
});

module.exports = Input;
