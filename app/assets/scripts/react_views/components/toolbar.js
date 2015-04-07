
var React = require('react');

var Toolbar = React.createClass({
  render: function () {
    return (
      <div id="toolbar-toolbar" className="toolbar ql-toolbar ql-snow">
        <span className="ql-format-group">
          <span title="Font" className="ql-font ql-picker">
            <span className="ql-picker-label" data-value="sans-serif">Sans Serif</span>
            <span className="ql-picker-options">
              <span data-value="sans-serif" className="ql-picker-item ql-selected">Sans Serif</span>
              <span data-value="serif" className="ql-picker-item">Serif</span>
              <span data-value="monospace" className="ql-picker-item">Monospace</span>
            </span>
          </span>
          <select title="Font" className="ql-font"  style={{display: "none"}}>
            <option value="sans-serif" selected="">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
          </select>
          <span title="Size" className="ql-size ql-picker">
          <span className="ql-picker-label" data-value="13px">Normal</span>

          <span className="ql-picker-options"><span data-value="10px" className="ql-picker-item">Small</span>
          <span data-value="13px" className="ql-picker-item ql-selected">Normal</span>
          <span data-value="18px" className="ql-picker-item">Large</span>
          <span data-value="32px" className="ql-picker-item">Huge</span>
          </span>

          </span>
          <select title="Size" className="ql-size" style={{display: "none"}}><option value="10px">Small</option>
          <option value="13px" selected="">Normal</option>
          <option value="18px">Large</option>
          <option value="32px">Huge</option>
          </select>
          </span>
          <span className="ql-format-group"><span title="Bold" className="ql-format-button ql-bold"></span>
          <span className="ql-format-separator"></span>
          <span title="Italic" className="ql-format-button ql-italic"></span>
          <span className="ql-format-separator"></span>
          <span title="Underline" className="ql-format-button ql-underline"></span>
          <span className="ql-format-separator"></span>
          <span title="Strikethrough" className="ql-format-button ql-strike"></span>
          </span>
          <span className="ql-format-group"><span title="Text Color" className="ql-color ql-picker ql-color-picker"><span className="ql-picker-label" data-value="rgb(0, 0, 0)"></span>
          <span className="ql-picker-options"><span data-value="rgb(0, 0, 0)" className="ql-picker-item ql-selected ql-primary-color"  style={{backgroundColor: "rgb(0, 0, 0)"}}></span>
          <span data-value="rgb(230, 0, 0)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(230, 0, 0)"}}></span>
          <span data-value="rgb(255, 153, 0)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(255, 153, 0)"}}></span>
          <span data-value="rgb(255, 255, 0)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(255, 255, 0)"}}></span>
          <span data-value="rgb(0, 138, 0)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(0, 138, 0)"}}></span>
          <span data-value="rgb(0, 102, 204)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(0, 102, 204)"}}></span>
          <span data-value="rgb(153, 51, 255)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(153, 51, 255)"}}></span>
          <span data-value="rgb(255, 255, 255)" className="ql-picker-item"  style={{backgroundColor: "rgb(255, 255, 255)"}}></span>
          <span data-value="rgb(250, 204, 204)" className="ql-picker-item"  style={{backgroundColor: "rgb(250, 204, 204)"}}></span>
          <span data-value="rgb(255, 235, 204)" className="ql-picker-item"  style={{backgroundColor: "rgb(255, 235, 204)"}}></span>
          <span data-value="rgb(255, 255, 204)" className="ql-picker-item"  style={{backgroundColor: "rgb(255, 255, 204)"}}></span>
          <span data-value="rgb(204, 232, 204)" className="ql-picker-item"  style={{backgroundColor: "rgb(204, 232, 204)"}}></span>
          <span data-value="rgb(204, 224, 245)" className="ql-picker-item"  style={{backgroundColor: "rgb(204, 224, 245)"}}></span>
          <span data-value="rgb(235, 214, 255)" className="ql-picker-item"  style={{backgroundColor: "rgb(235, 214, 255)"}}></span>
          <span data-value="rgb(187, 187, 187)" className="ql-picker-item"  style={{backgroundColor: "rgb(187, 187, 187)"}}></span>
          <span data-value="rgb(240, 102, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(240, 102, 102)"}}></span>
          <span data-value="rgb(255, 194, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(255, 194, 102)"}}></span>
          <span data-value="rgb(255, 255, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(255, 255, 102)"}}></span>
          <span data-value="rgb(102, 185, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(102, 185, 102)"}}></span>
          <span data-value="rgb(102, 163, 224)" className="ql-picker-item"  style={{backgroundColor: "rgb(102, 163, 224)"}}></span>
          <span data-value="rgb(194, 133, 255)" className="ql-picker-item"  style={{backgroundColor: "rgb(194, 133, 255)"}}></span>
          <span data-value="rgb(136, 136, 136)" className="ql-picker-item"  style={{backgroundColor: "rgb(136, 136, 136)"}}></span>
          <span data-value="rgb(161, 0, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(161, 0, 0)"}}></span>
          <span data-value="rgb(178, 107, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(178, 107, 0)"}}></span>
          <span data-value="rgb(178, 178, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(178, 178, 0)"}}></span>
          <span data-value="rgb(0, 97, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(0, 97, 0)"}}></span>
          <span data-value="rgb(0, 71, 178)" className="ql-picker-item"  style={{backgroundColor: "rgb(0, 71, 178)"}}></span>
          <span data-value="rgb(107, 36, 178)" className="ql-picker-item"  style={{backgroundColor: "rgb(107, 36, 178)"}}></span>
          <span data-value="rgb(68, 68, 68)" className="ql-picker-item"  style={{backgroundColor: "rgb(68, 68, 68)"}}></span>
          <span data-value="rgb(92, 0, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(92, 0, 0)"}}></span>
          <span data-value="rgb(102, 61, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(102, 61, 0)"}}></span>
          <span data-value="rgb(102, 102, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(102, 102, 0)"}}></span>
          <span data-value="rgb(0, 55, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(0, 55, 0)"}}></span>
          <span data-value="rgb(0, 41, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(0, 41, 102)"}}></span>
          <span data-value="rgb(61, 20, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(61, 20, 102)"}}></span>
          </span>
          </span>
          <select title="Text Color" className="ql-color"  style={{display: "none"}}><option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)" selected=""></option>
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
          <span className="ql-format-separator"></span>
          <span title="Background Color" className="ql-background ql-picker ql-color-picker"><span className="ql-picker-label" data-value="rgb(255, 255, 255)"></span>
          <span className="ql-picker-options"><span data-value="rgb(0, 0, 0)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(0, 0, 0)"}}></span>
          <span data-value="rgb(230, 0, 0)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(230, 0, 0)"}}></span>
          <span data-value="rgb(255, 153, 0)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(255, 153, 0)"}}></span>
          <span data-value="rgb(255, 255, 0)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(255, 255, 0)"}}></span>
          <span data-value="rgb(0, 138, 0)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(0, 138, 0)"}}></span>
          <span data-value="rgb(0, 102, 204)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(0, 102, 204)"}}></span>
          <span data-value="rgb(153, 51, 255)" className="ql-picker-item ql-primary-color"  style={{backgroundColor: "rgb(153, 51, 255)"}}></span>
          <span data-value="rgb(255, 255, 255)" className="ql-picker-item ql-selected"  style={{backgroundColor: "rgb(255, 255, 255)"}}></span>
          <span data-value="rgb(250, 204, 204)" className="ql-picker-item"  style={{backgroundColor: "rgb(250, 204, 204)"}}></span>
          <span data-value="rgb(255, 235, 204)" className="ql-picker-item"  style={{backgroundColor: "rgb(255, 235, 204)"}}></span>
          <span data-value="rgb(255, 255, 204)" className="ql-picker-item"  style={{backgroundColor: "rgb(255, 255, 204)"}}></span>
          <span data-value="rgb(204, 232, 204)" className="ql-picker-item"  style={{backgroundColor: "rgb(204, 232, 204)"}}></span>
          <span data-value="rgb(204, 224, 245)" className="ql-picker-item"  style={{backgroundColor: "rgb(204, 224, 245)"}}></span>
          <span data-value="rgb(235, 214, 255)" className="ql-picker-item"  style={{backgroundColor: "rgb(235, 214, 255)"}}></span>
          <span data-value="rgb(187, 187, 187)" className="ql-picker-item"  style={{backgroundColor: "rgb(187, 187, 187)"}}></span>
          <span data-value="rgb(240, 102, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(240, 102, 102)"}}></span>
          <span data-value="rgb(255, 194, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(255, 194, 102)"}}></span>
          <span data-value="rgb(255, 255, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(255, 255, 102)"}}></span>
          <span data-value="rgb(102, 185, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(102, 185, 102)"}}></span>
          <span data-value="rgb(102, 163, 224)" className="ql-picker-item"  style={{backgroundColor: "rgb(102, 163, 224)"}}></span>
          <span data-value="rgb(194, 133, 255)" className="ql-picker-item"  style={{backgroundColor: "rgb(194, 133, 255)"}}></span>
          <span data-value="rgb(136, 136, 136)" className="ql-picker-item"  style={{backgroundColor: "rgb(136, 136, 136)"}}></span>
          <span data-value="rgb(161, 0, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(161, 0, 0)"}}></span>
          <span data-value="rgb(178, 107, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(178, 107, 0)"}}></span>
          <span data-value="rgb(178, 178, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(178, 178, 0)"}}></span>
          <span data-value="rgb(0, 97, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(0, 97, 0)"}}></span>
          <span data-value="rgb(0, 71, 178)" className="ql-picker-item"  style={{backgroundColor: "rgb(0, 71, 178)"}}></span>
          <span data-value="rgb(107, 36, 178)" className="ql-picker-item"  style={{backgroundColor: "rgb(107, 36, 178)"}}></span>
          <span data-value="rgb(68, 68, 68)" className="ql-picker-item"  style={{backgroundColor: "rgb(68, 68, 68)"}}></span>
          <span data-value="rgb(92, 0, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(92, 0, 0)"}}></span>
          <span data-value="rgb(102, 61, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(102, 61, 0)"}}></span>
          <span data-value="rgb(102, 102, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(102, 102, 0)"}}></span>
          <span data-value="rgb(0, 55, 0)" className="ql-picker-item"  style={{backgroundColor: "rgb(0, 55, 0)"}}></span>
          <span data-value="rgb(0, 41, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(0, 41, 102)"}}></span>
          <span data-value="rgb(61, 20, 102)" className="ql-picker-item"  style={{backgroundColor: "rgb(61, 20, 102)"}}></span>
          </span>
          </span>
          <select title="Background Color" className="ql-background"  style={{display: "none"}}><option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)"></option>
          <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
          <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
          <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
          <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
          <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
          <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
          <option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)" selected=""></option>
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
          <span className="ql-format-group"><span title="List" className="ql-format-button ql-list"></span>
          <span className="ql-format-separator"></span>
          <span title="Bullet" className="ql-format-button ql-bullet"></span>
          <span className="ql-format-separator"></span>
          <span title="Text Alignment" className="ql-align ql-picker"><span className="ql-picker-label" data-value="left"></span>
          <span className="ql-picker-options"><span data-value="left" className="ql-picker-item ql-selected"></span>
          <span data-value="center" className="ql-picker-item"></span>
          <span data-value="right" className="ql-picker-item"></span>
          <span data-value="justify" className="ql-picker-item"></span>
          </span>
          </span>
          <select title="Text Alignment" className="ql-align"  style={{display: "none"}}><option value="left" label="Left" selected=""></option>
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
