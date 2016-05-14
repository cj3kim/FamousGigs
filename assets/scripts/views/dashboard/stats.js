
var React = require('react');
var ReactSurface = require('react-surface');

var View = require('famous/core/View');

var StatsReact = React.createClass({
  render: function () {
    return (
      <div className="dashboard stop-gap-div">
        <div className="title row">
          <span>stats</span>
        </div>

        <div id="stats" className="form row">
          <form action="">
            <table border="0">
              <tr>
                <td><label for="posts">posts</label></td>
                <td>3</td>
              </tr>

              <tr>
                <td><label for="balance">balance</label></td>
                <td>$50</td>
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
    size: [200, 157],
    classes: ['rounded-corners'],
    content: <StatsReact />
  });

  this._node.add(this.surface);
}

Stats.prototype = Object.create(View.prototype);
Stats.prototype.constructor = View;

module.exports = Stats;


