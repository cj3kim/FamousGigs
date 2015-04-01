
var React = require('react');
var ReactSurface = require('react-surface');

var View = require('famous/core/View');

var StatsReact = React.createClass({
  render: function () {
    return (
      <div id='stats' className="dashboard stop-gap-div">
        <div className="title row">
          <span>Profile Basics</span>
        </div>

        <div className="form row">
          <form action="">
            <table border="0">
              <tr>
                <td><label for="posts">posts</label></td>
                <td><input type="text" name="posts" value="" /></td>
              </tr>

              <tr>
                <td><label for="balance">balance</label></td>
                <td><input type="text" name="balance" value="" /></td>
              </tr>
           </table>
          </form>
        </div>
      </div>
    );
  }
});

function Stats() {
  View.apply(this, arguments);

  this.surface = new ReactSurface({
    size: [200, 100],
    content: <StatsReact />
  });

  this._node.add(this.surface);
}

Stats.prototype = Object.create(View.prototype);
Stats.prototype.constructor = View;

module.exports = Stats;


