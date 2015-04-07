
var React = require('react');

var Toolbar = React.createClass({
  render: function () {
    return (
      <div id="toolbar-toolbar" className="toolbar ql-toolbar ql-snow">
        <span className="ql-format-group">
          <select title="Size" className="ql-size" defaultValue="16px">
            <option value="16px">Normal</option>
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

        <span className="ql-format-group">
          <select title="Text Color" className="ql-color" defaultValue="rgb(0, 0, 0)">
            <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)"></option>
            <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
            <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
            <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
            <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
            <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
            <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
            <option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)"></option>
            <option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>
            <option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>
            <option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>
            <option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>
            <option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>
            <option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>
            <option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>
            <option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>
            <option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>
            <option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>
            <option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>
            <option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>
            <option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>
            <option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>
            <option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>
            <option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>
            <option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>
            <option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>
            <option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>
            <option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>
            <option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>
            <option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>
            <option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>
            <option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>
            <option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>
            <option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>
            <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
          </select>
        </span>

        <span className="ql-format-separator"></span>

        <span className="ql-format-group">
          <select title="Background Color" className="ql-background" defaultValue="rgb(255, 255, 255)">
            <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)"></option>
            <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
            <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
            <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
            <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
            <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
            <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
            <option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)"></option>
            <option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>
            <option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>
            <option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>
            <option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>
            <option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>
            <option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>
            <option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>
            <option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>
            <option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>
            <option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>
            <option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>
            <option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>
            <option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>
            <option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>
            <option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>
            <option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>
            <option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>
            <option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>
            <option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>
            <option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>
            <option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>
            <option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>
            <option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>
            <option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>
            <option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>
            <option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>
            <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
          </select>
        </span>

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