var React       = require("react");
var ReactRouter = require("react-router");
var CompanyAdComponent  = require("./company_ad.js");
var CompanyAdCollection = require("../../../collections/company_ads.js");

var companyAdCollection = new CompanyAdCollection();

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
              return <CompanyAdComponent {...model}/>;
          });
          _this.setState({ companyAds: _this.state.companyAds.concat(ads) });
      })
  },

  render: function () {
    return (
      <div className="gigs">
        {this.state.companyAds}
      </div>
    );
  }
});




