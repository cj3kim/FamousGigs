var React       = require("react");
var ReactRouter = require("react-router");
var ReactDom    = require("react-dom");
var render      = ReactDom.render;

var Link        = ReactRouter.Link;
var Route       = ReactRouter.Route;
var Router      = ReactRouter.Router;
//var hashHistory = ReactRouter.hashHistory;

var IndexRoute  = ReactRouter.IndexRoute;
var AdDetails   = require("./react_views/components/ad-details/index.js");
var AdPostForm  = require("./react_views/components/post-job/ad/index.js");

var path = require("path");
var App  = require("./react_views/components/app/app_container.js");

var Gigs = require("./react_views/components/gigs/index.js")
var PaymentComplete = require("./react_views/components/post-job/payment_complete")
var ReviewAndCheckout = require("./react_views/components/post-job/review/index");

var browserHistory = ReactRouter.browserHistory;

var appRoute = (
  <Router history = {browserHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Gigs}/>
          <Route path="/gigs" component={Gigs} />
          <Route path="/gigs/:job_id" component={AdDetails} />

          <Route path="/post_job" component={AdPostForm} />
          <Route path="/post_job/payment" component={ReviewAndCheckout} />
          <Route path="/post_job/payment/complete" component={PaymentComplete} />
      </Route>
  </Router>
);

module.exports = appRoute;
