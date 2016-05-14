var React        = require('react');
var ReactSurface = require('react-surface');
var User = require('../../models/singleton/user');

var AvatarComponent = React.createClass({
  componentDidMount: function () {
  },

  getInitialState: function () {
    return {
      avatarUrl: User.get('avatar_url'),
    };
  },
  render: function () {
    return (
      <div className='avatar-container'>
        <div className='avatar'>
          <img src={this.state.avatarUrl} />
        </div>

        <span className='change-avatar'>Change avatar</span>
      </div>
    );
  }
});

var HeaderTitleComponent = React.createClass({
  render: function () {
    return (
      <div className='header'>
        <span className='title'> Dashboard</span>

        <span className='description'> Oakland, CA  - 3 Posts</span>
      </div>
    );
  }
});


var HeaderComponent = React.createClass({
  render: function () {
    return (
      <div className='dashboard-header stop-gap-div'>
        <HeaderTitleComponent />
        <AvatarComponent />
      </div>
    );
  }
});

var Header = new ReactSurface({
  size: [undefined, 150],
  content: <HeaderComponent />,
});

module.exports = Header;
