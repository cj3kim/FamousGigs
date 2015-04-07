
var React = require('react');

var Toolbar = React.createClass({
  render: function () {
    return (
      <div id="toolbar-toolbar" className="toolbar ql-toolbar ql-snow">
        <span className="ql-format-group">
          <select title="Size" className="ql-size" defaultValue="13px" >
            <option value="13px">Small</option>
            <option value="16px" selected>Normal</option>
            <option value="25px">Large</option>
            <option value="32px">Huge</option>
          </select>
        </span>

        <span className="ql-format-group">
          <span title="Bold" className="ql-format-button ql-bold"></span>
          <span className="ql-format-separator"></span>
          <span title="Italic" className="ql-format-button ql-italic"></span>
          <span className="ql-format-separator"></span>
          <span title="Underline" className="ql-format-button ql-underline"></span>
          <span className="ql-format-separator"></span>
          <span title="Strikethrough" className="ql-format-button ql-strike"></span>
        </span>

        <span className="ql-format-separator"></span>

        <span className="ql-format-group">
          <span title="List" className="ql-format-button ql-list"></span>
          <span className="ql-format-separator"></span>
          <span title="Bullet" className="ql-format-button ql-bullet"></span>
          <span className="ql-format-separator"></span>

          <select title="Text Alignment" className="ql-align" defaultValue="left">
            <option value="left" label="Left"></option>
            <option value="center" label="Center"></option>
            <option value="right" label="Right"></option>
            <option value="justify" label="Justify"></option>
          </select>
        </span>
      </div>

    );
  }
});

module.exports = Toolbar;
