var Formsy = require("formsy-react");
var React = require("react");

var CheckboxInput = React.createClass({
  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],
  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    var checked = event.currentTarget.checked;
    this.setValue(checked);
  },
  render: function () {
    var className = this.showRequired() ? "required" : this.showError() ? "error" : null;
    var errorMessage = this.getErrorMessage();
    return (
        <input type="checkbox" onChange={this.changeValue} value={this.getValue()} checked={this.getValue()}/>
    );
  }
});

module.exports = CheckboxInput;
