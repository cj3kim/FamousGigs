var React       = require("react");
var ReactRouter = require("react-router");
var ReactDOM    = require("react-dom");
var Link = require("react-router").Link
var withRouter = require("react-router").withRouter;

var AdFilterComponent = React.createClass({
  componentDidMount: function () {
  },
  render: function () {
    return (
      <div className="ad-filters">
      </div>
    );
  }
});
module.exports = AdFilterComponent;
