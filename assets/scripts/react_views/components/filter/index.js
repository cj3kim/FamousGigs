var React       = require("react");
var ReactRouter = require("react-router");
var ReactDOM    = require("react-dom");
var Link = require("react-router").Link
var withRouter = require("react-router").withRouter;
var GeneralContent = require("../../new_general_content");
var filterModel = require ("../../../models/singleton/filter");

var companyAdsCollection = require("../../../collections/singleton/company_ads");

var AdFilterComponent = React.createClass({
  componentDidMount: function () {
  },

  triggerFilter: function (evt) {
    evt.preventDefault();
    filterModel.set("job_location", evt.target.text);
  },
  render: function () {
    var _this = this;
    var location_counts = companyAdsCollection.models.reduce(function (accum, curr_model) {
      var job_location = curr_model.get("job_location");
      var job_count = accum[job_location];

      if (job_count === undefined) {
        accum[job_location] = 1;
      } else {
        accum[job_location] += 1;
      }
      return accum;
    }, {});

    var locations = Object.keys(location_counts).map(function (location) {
      return (<li><a href="" onClick={_this.triggerFilter}>{location}</a> ({location_counts[location]})</li>);
    });

    return (
      <GeneralContent className="ad-filter" headerName="Filter">
        <h3>Locations </h3>
        <ul>
          {locations}
        </ul>
        <h3>Backend</h3>
      </GeneralContent>
    );
  }
});
module.exports = AdFilterComponent;
