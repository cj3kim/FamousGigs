var React        = require('react');
var ReactSurface = require('react-surface');
var View         = require('famous/core/View');

var HeaderTitleReact = React.createClass({
  render: function () {
    return (
      <div className='header stop-gap-div'>
        <span className='title'> Dashboard</span>

        <span className='description'> Oakland, CA  - 3 Posts</span>
      </div>
    );
  }

});


function HeaderTitle () {
  View.apply(this, arguments);


  var ht = new ReactSurface({
    size: [undefined, undefined],
    content: <HeaderTitleReact />
  });

  this._node.add(ht);
};

HeaderTitle.prototype = Object.create(View.prototype);
HeaderTitle.prototype.constructor = View;


module.exports = HeaderTitle;
