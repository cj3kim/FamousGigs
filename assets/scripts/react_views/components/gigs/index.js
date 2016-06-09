var React       = require("react");
var ReactRouter = require("react-router");
var CompanyAdComponent  = require("./company_ad.js");
var companyAdCollection = require("../../../collections/singleton/company_ads.js");
var filterModel = require("../../../models/singleton/filter");
var AdFilter = require ("../filter/index.js");

var Masonry = require('react-masonry-component');
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");
var withRouter = require("react-router").withRouter;

var masonryOptions = {
    transitionDuration: 0
};
companyAdCollection.firstFetch = true;

var Gigs = React.createClass({
  getInitialState: function () {
      var models = companyAdCollection.models;
      return {
        models:  models,
        companyAds: this.generateAds(models)
      };
  },
  componentDidMount: function () {
      filterModel.on("change", function (evt) {
          _this.setState({
            companyAds: _this.generateAds(_this.state.models)
          });
      });

      var _this = this;
      if (companyAdCollection.firstFetch) {
          var promise = companyAdCollection.fetch();
          promise.done(function (models) {
            var ads = _this.generateAds(companyAdCollection.models);
            companyAdCollection.firstFetch = false;
            _this.setState({
              models: models,
              companyAds: ads,
            });
          });
      }
  },
  generateAds: function (models) {
     var job_location = filterModel.get("job_location");
      if (job_location.length > 0) {
        models = models.filter(function (e) {
          return e.job_location === job_location;
        })
      }
      var ads = models.map(function (model) {
          return <CompanyAdComponent key={model.id} model={model.attributes}/>;
      });
      return ads;
  },

  render: function () {
    var _this = this;
    return (
      <div className="gigs">
          <Masonry className={"my-gallery-class"} elementType={"div"} options={masonryOptions} disableImagesLoaded={false} >

              <AdFilter />
              {this.state.companyAds}
          </Masonry>
      </div>
    );
  }
});

module.exports = withRouter(Gigs);

