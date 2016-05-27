var React       = require("react");
var ReactRouter = require("react-router");
var CompanyAdComponent  = require("./company_ad.js");
var companyAdCollection = require("../../../collections/singleton/company_ads.js");
var filterModel = require("../../../models/singleton/filter");
var AdFilter = require ("../filter/index.js");

var ReactCSSTransitionGroup = require("react-addons-css-transition-group");

//Gigs
module.exports = React.createClass({
  getInitialState: function () {
      return { models: [],
        companyAds: [] };
  },
  componentDidMount: function () {
      console.log("called componentDidMount");
      filterModel.on("change", function (evt) {
          _this.setState({
            companyAds: _this.generateAds(_this.state.models) 
          });
      });
      var _this = this;
      var promise = companyAdCollection.fetch();
      promise.done(function (models) {
        var ads = _this.generateAds(models);
        _this.setState({
          models: models,
          companyAds: ads });
      });
  },
  generateAds: function (models) {
     var job_location = filterModel.get("job_location");
      if (job_location.length > 0) {
        models = models.filter(function (e) {
          return e.job_location ===job_location;
        })
      }
      var ads = models.map(function (model) {
          return <CompanyAdComponent key={model.id} model={model}/>;
      });
      return ads;
  },

  render: function () {
    var _this = this;
    return (
      <div className="gigs">
          <div className="col-1">
              <ReactCSSTransitionGroup
                 transitionName="gigs"
                 transitionAppear={true}
                 transitionAppearTimeout={500}
                 transitionEnterTimeout={500}
                 transitionLeaveTimeout={300}>
                  {this.state.companyAds}
              </ReactCSSTransitionGroup>
          </div>
          <div className="col-2">
            <AdFilter />
          </div>
      </div>
    );
  }
});




