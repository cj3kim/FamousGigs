var React       = require("react");
var ReactDOM    = require("react-dom");
var $           = require("zepto-browserify").$;
var sgCompanyAdStore = require("../../../models/singleton/company_ad.js");
var TextInput     = require("../../forms/inputs/text");
var GeneralContent = require("../../new_general_content");
var withRouter = require("react-router").withRouter;


var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var S3Mixin         = require("../../../views/S3Mixin");
var DropzoneMixin   = require("../../dropzone_mixin");

var PaymentComplete = React.createClass({
  mixins:  [S3Mixin, DropzoneMixin],
  getInitialState: function () {
    return {
      flip: true,
      progress: 0,
      hasUploadedImage: false
    }
  },
  componentDidMount: function () {
    var _this = this;

    var image_file = sgCompanyAdStore.image_file;
    var postObj    = sgCompanyAdStore.attributes;

    function createPost () {
      $.post("/company_ads/create", postObj, function () {
        _this.flipIt();
      });
    }
    if (image_file && !_this.state.hasUploadedImage) {
        _this.setState({hasUploadedImage: true})
        var image_file = sgCompanyAdStore.image_file;
        _this.uploadImage(image_file,
           function(e) {
              if (e.lengthComputable) {
                var percentComplete = (e.loaded / e.total) || 0;
                var value = percentComplete * 100;
                _this.setState({progress: value});
                _this.progress.value = value;
              }
            },
            function (logo_url) {
              postObj.logo_url = logo_url;
              createPost();
            }
        );
    } else {
      createPost();
    }
  },
  flipIt: function () {
    this.setState({flip: !this.state.flip })
  },

  render: function () {
    var result = this.state.flip ? (<UploadingLogo progress={this.state.progress} />)
                                 : (<Complete />);
    var wave_class = ["sk-wave", (!this.state.flip ? "hidden" : "")].join(" ");
    return (
      <GeneralContent className="payment-completion" headerName="Payment Complete!">
        <div className={wave_class}>
          <div className="sk-rect sk-rect1"></div>
          <div className="sk-rect sk-rect2"></div>
          <div className="sk-rect sk-rect3"></div>
          <div className="sk-rect sk-rect4"></div>
          <div className="sk-rect sk-rect5"></div>
        </div>

        <ReactCSSTransitionGroup transitionName="example"
                                 transitionEnterTimeout={300}
                                 transitionLeaveTimeout={300}>
          {result}
        </ReactCSSTransitionGroup>
      </GeneralContent >
    );
  }
});

var UploadingLogo = React.createClass({
  render: function () {
    var progress = this.props.progress || 0;
    return (
      <div key="1">
        <img src={sgCompanyAdStore.image_preview} />
        <p> Uploading your logo to the cloud... </p>
        <progress value={progress} max="100"></progress>
      </div>
    );
  }
});

var Complete = withRouter(React.createClass({
  returnHome: function () {
    this.props.router.push("/gigs");
  },
  render: function () {
    return (
      <div key="2">
        <p>Done!</p>
        <p> Thank you for posting on our site! </p>

        <button onClick={this.returnHome} className="pay-btn" type="submit">
          <span>Return to Home Page</span>
        </button>
      </div>
    );
  }
}));



module.exports = withRouter(PaymentComplete);
