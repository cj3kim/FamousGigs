var React = require("react");
var GeneralContent = require("../../new_general_content");

module.exports = React.createClass({
  render: function () {
    return (
      <GeneralContent className="why-us" headerName="Why Us?">
          <ul>
            <li>Find Great React and JS Devs</li>
            <li>Access to Developer Network</li>
            <li>Focus on React</li>
          </ul>
      </GeneralContent>
    );
  }
});

