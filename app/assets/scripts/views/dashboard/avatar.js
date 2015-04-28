var React        = require('react');
var ReactSurface = require('react-surface');
var View         = require('famous/core/View');

var AvatarReact = React.createClass({
  render: function () {
    return (
      <div className='avatar-container stop-gap-div'>
        <div className='avatar'>
          <span className='flaticon-user91'> </span>
        </div>

        <span className='change-avatar'>Change avatar</span>
      </div>
    );
  }
});

function Avatar() {
  View.apply(this, arguments);

  var avatar = new ReactSurface({
    size: [131, 131],
    content: <AvatarReact />
  });

  this._node.add(avatar);
}

Avatar.prototype = Object.create(View.prototype);
Avatar.prototype.constructor = View;

module.exports = Avatar;
