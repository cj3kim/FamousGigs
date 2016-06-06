var React       = require("react");
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
    evt.stopPropagation();
    var location = evt.target.attributes["data-location"].nodeValue;
    filterModel.set("job_location", location);
  },
  triggerAll: function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    filterModel.set("job_location", "");
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

    var locations = Object.keys(location_counts).map(function (location, i) {
      var job_location  = location.split(",").slice(0,2).join(", ");
      return (<li key={i} ><a href="" data-location={location} onClick={_this.triggerFilter}>{job_location}</a> ({location_counts[location]})</li>);
    });

    return (
      <GeneralContent className="ad-filter" headerName="Filter">
        <h3>Locations </h3>
        <ul>
          <li><a href="" onClick={_this.triggerAll}>All</a></li>
          {locations}
        </ul>
      </GeneralContent>
    );
  }
});
module.exports = AdFilterComponent;
