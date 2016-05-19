var Quill = require("quill");
var React = require("react");

var ReactDOM    = require("react-dom");
var ReactQuill = React.createClass({
  componentDidMount: function () {
    var _this = this;
    var div = ReactDOM.findDOMNode(this);
    var quillEditor = this.generateQuillForm(div);
    var shouldSet = true;
    var onChangeFn = this.props.onChange || function () {} ;

    quillEditor.on("text-change", function (delta, source) {
        if (shouldSet) {
          setTimeout(function () {
            shouldSet = true;
            var quillText = quillEditor.getHTML()
            onChangeFn(quillText);
          }, 500);
          shouldSet = false;
        }
    })
  },
  generateQuillForm: function (div) {
      return new Quill(div, {
        styles: {
          ".ql-editor": {
            "font-family": "Helvetica, 'Arial', san-serif;"
          }
        },
        modules: { "toolbar": {
          container: "#ad-toolbar" }, },
        theme: "snow"
      });
  },
  render: function () {
    return (
      <div className='quill-ad-form'> </div>
    );
  }

});

module.exports = ReactQuill;
