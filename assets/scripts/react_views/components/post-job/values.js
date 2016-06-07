var React = require("react");
var GeneralContent = require("../../new_general_content");

module.exports = React.createClass({
  displayName: "OurValues",
  render: function () {
    return (
      <GeneralContent className="why-us" headerName="Our Values">
          <ul>
            <li>Ignite the hero in all of us</li>
            <li>Pull each other to greater heights</li>
            <li>Give and expect respect </li>
            <li>Grow your mind, morals, and spirit</li>
          </ul>
      </GeneralContent>
    );
  }
});
