var React       = require("react");
var ReactRouter = require("react-router");
var withRouter = require("react-router").withRouter;

var Masonry = require('react-masonry-component');
var masonryOptions = { transitionDuration: 0 };

var Articles = React.createClass({
  displayName: "Articles",
  getInitialState: function () {
      return {
          models: []
      };
  },
  render: function () {
    var _this = this;
    return (
      <div className="articles">
          <Masonry className={"my-gallery-class"} elementType={"div"} options={masonryOptions} disableImagesLoaded={false} >
              {this.state.}
          </Masonry>
      </div>
    );
  }
});

module.exports = withRouter(Articles);

