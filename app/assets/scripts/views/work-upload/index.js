
var View  = require('famous/core/View');
var Modifier = require('famous/core/Modifier');
var React = require('react');
var ReactSurface = require('react-surface');
var Transform = require('famous/core/Transform');

var WorkUploadComponent = React.createClass({
  render: function () {
    return (
      <div className='work-upload stop-gap-div'>
        <span> Add a Work Item </span>
      </div>
    );
  }
});

function WorkUpload () {
  View.apply(this, arguments);

  var surface = new ReactSurface({
    size: [235, 300],
    classes: ['rounded-corners'],
    content: <WorkUploadComponent />,
    properties: {
      backgroundColor: 'white'
    }
  });

  this._node.add(surface);
}

WorkUpload.prototype = Object.create(View.prototype);
WorkUpload.prototype.constructor = WorkUpload;

module.exports = WorkUpload;
