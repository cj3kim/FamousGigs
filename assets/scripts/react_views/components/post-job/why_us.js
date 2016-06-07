var React = require("react");
var GeneralContent = require("../../new_general_content");

module.exports = React.createClass({
  render: function () {
    return (
      <GeneralContent className="why-us" headerName="Why Us?">
          <ul>
            <li>Focus on React</li>
            <li>Great Developer Network</li>
          </ul>
      </GeneralContent>
    );
  }
});

