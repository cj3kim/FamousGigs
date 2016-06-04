var React       = require("react");
var ReactRouter = require("react-router");
var Link        = ReactRouter.Link;
var MainNavBar  = require("../navbar/index");
var App = React.createClass({
  render: function () {
    return (
      <div>
        <MainNavBar />
        <div className="app-body">
            { this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = App;

