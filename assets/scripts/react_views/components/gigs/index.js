var React       = require("react");
var ReactRouter = require("react-router");
var CompanyAdComponent  = require("./company_ad.js");
var CompanyAdCollection = require("../../../collections/company_ads.js");
var AdFilter = require ("../filter/index.js");

var companyAdCollection = new CompanyAdCollection();

var ReactCSSTransitionGroup = require("react-addons-css-transition-group");

//Gigs
module.exports = React.createClass({
  getInitialState: function () {
      return { companyAds: [] };
  },
  componentDidMount: function () {
      var _this = this;
      var promise = companyAdCollection.fetch();
      promise.done(function (models) {
          var ads = models.map(function (model) {
              return <CompanyAdComponent key={model.id} model={model}/>;
          });
          _this.setState({ companyAds: _this.state.companyAds.concat(ads) });
      })
  },

  render: function () {
    return (
      <div className="gigs">
          <AdFilter />
          <ReactCSSTransitionGroup transitionName="example"
                                   transitionAppear={true}
                                   transitionAppearTimeout={500}
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={300}>
              {this.state.companyAds}
          </ReactCSSTransitionGroup>
      </div>
    );
  }
});




