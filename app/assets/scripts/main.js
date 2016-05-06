var React       = require("react");
var ReactRouter = require("react-router");
var ReactDom    = require("react-dom");
var render      = ReactDom.render;

var Link        = ReactRouter.Link;
var Route       = ReactRouter.Route;
var Router      = ReactRouter.Router;
var hashHistory = ReactRouter.hashHistory;

var path = require("path");
var test = require("./react_views/test.js")
var App  = require("./react_views/components/app/app_container.js");

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById("app"))

