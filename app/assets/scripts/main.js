var React       = require("react");
var ReactRouter = require("react-router");
var ReactDom    = require("react-dom");
var render      = ReactDom.render;

var Link        = ReactRouter.Link;
var Route       = ReactRouter.Route;
var Router      = ReactRouter.Router;
var hashHistory = ReactRouter.hashHistory;

var AdDetails   = require("./react_views/components/ad-details/index.js");

var path = require("path");
var App  = require("./react_views/components/app/app_container.js");

var Gigs = require("./react_views/components/gigs/index.js")

render((
  <Router history={hashHistory}>
      <Route path="/" component={App}>
          <Route path="/gigs" component={Gigs} />
          <Route path="/gigs/:job_id" component={AdDetails} />
      </Route>
  </Router>
), document.getElementById("app"))

