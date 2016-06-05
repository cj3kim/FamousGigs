var Formsy = require("formsy-react");
var ReactDOM    = require("react-dom");
var React = require("react");
var $ = require("zepto-browserify").$;

var TextInput = React.createClass({
  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    var input     = event.currentTarget.value;
    this.setValue(input);
  },

  componentDidMount: function () {
    var _this = this;
    var google_search = this.props.google_search;
    if (google_search) {
      var $div = $(ReactDOM.findDOMNode(this))
      var $input = $div.find("input");
      var input = $input[0];
      var searchBox = new google.maps.places.SearchBox(input);

      searchBox.addListener("places_changed", function () {
        var places = searchBox.getPlaces();
        var place  = places[0];
        var location = place.formatted_address;
        _this.setValue(location);
      });
    }
  },

  render: function () {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid

    var className = this.props.className || "";
    var validationClass = this.showRequired() ? "required" : this.showError() ? "error" : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();
    var defaultType  = "text"
    var _class = [className, validationClass, "form-row" ].join(" ");
    return (
      <div className={_class}>
          <div className="col">
              <div>
                <label for={this.props.name}>{this.props.label}</label>
                <span className="input-error">{this.isRequired() ? "*" : null}</span>
                <span className="input-error"> &nbsp;{errorMessage}</span>
              </div>
              <input type={this.props.type || defaultType} onChange={this.changeValue} placeholder="" value={this.getValue()}/>
          </div>
      </div>
    );
  }
});

module.exports = TextInput;
