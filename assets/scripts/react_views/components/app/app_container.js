var React       = require("react");
var ReactRouter = require("react-router");
var Link        = ReactRouter.Link;

/* <li>*/
    //<Link to="/developers">
       //<span className='icon flaticon-user91'></span>
       //&nbsp;
       //Developers
    //</Link>
/*</li>*/
var App = React.createClass({
  render: function () {
    return (
      <div>
        <div className="main-nav-bar">
          <div className="main-nav-bar-floater">
            <div className='text-logo'><span className='first'>React<span className='second'>Hero</span></span></div>
            <div className="menu-button"><span className='icon flaticon-menu55'></span></div>
            <ul>
              <li>
                  <Link to="/gigs">
                    <span className='icon flaticon-pin71'></span>
                    &nbsp;
                    Jobs/Gigs
                  </Link>
              </li>

              <li>
                  <Link to="/post_job">
                    <span className='icon flaticon-sheet3'></span>
                    &nbsp;
                    Post
                  </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="app-body">
            { this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = App;

