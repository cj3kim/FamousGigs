var React       = require("react");
var ReactRouter = require("react-router");
var Link        = ReactRouter.Link;

module.exports = React.createClass({
  displayName: "MainNavBar",
  renderLinks: function (links) {
    return links.map(function (elem) {
      var _path = elem._path;
      var iconName = elem.iconName;
      var displayName= elem.displayName;
      var iconClass = "icon flaticon-" + iconName
      return (
        <li key={displayName}>
          <Link to={_path}>
            <span className={iconClass}></span>
            &nbsp;
            {displayName}
          </Link>
        </li>
      );
    });
  },

  generateLinkObj: function (_path, iconName, displayName) {
    return {_path: _path, iconName: iconName, displayName: displayName};
  },
  showMenu: function () {
    function isHidden(el) {
        return (el.offsetParent === null)
    }
    var menuLinks = this.refs.menuLinks;

    var hidden = isHidden(menuLinks);
    menuLinks.style.display = hidden ? "block" : "none";
  },

  render: function () {
    var _this = this;
    var linkArgs = [
      ["/gigs", "pin71", "Jobs/Gigs"],
      ["/post_job", "sheet3", "Post"]
    ];

    var links = linkArgs.map(function (linkArg) { return _this.generateLinkObj.apply(null, linkArg); })

    return (
      <div className="main-nav-bar">
        <div className="main-nav-bar-floater">
          <div className='text-logo'><span className='first'>React<span className='second'>Hero</span></span></div>
          <div className="menu-button" onClick={this.showMenu}><span className='icon flaticon-menu55'></span></div>
          <ul ref="menuLinks">
            {this.renderLinks(links)}
          </ul>
        </div>
      </div>
    );
  }
});
