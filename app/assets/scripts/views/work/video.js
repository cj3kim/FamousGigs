var VideoSurface = require('famous/surfaces/VideoSurface');
var React = require('react');
var ReactSurface = require('react-surface');
var $ = require('zepto-browserify').$;
var GeneralContent = require('../../react_views/general_content');

var VideoComponent = React.createClass({
  componentDidMount: function () {
     var video = React.findDOMNode(this);
     var $video = $(video);
     this.video = video;

     this.video.addEventListener('click', function () {
       this.play();
       $video.trigger('playing');
     });
  },

  render: function () {
    return (
      <video src={ this.props.url}> </video>
    );
  }
});


module.exports = function (options) {
  var lightboxNode = options.lightboxNode;
  var lightbox = options.lightbox;

  var attributes = options.attributes;
  console.log('attributes');
  console.log(attributes);
  var settings = {
    headerName: attributes.title || "No Title",
    attributes: attributes,
    reactClass: VideoComponent
  };

  var surface = new ReactSurface({
    content: <GeneralContent { ...settings }/>
    //classes: ['rounded-corners']
  });

  surface.on('playing', function (e) {
    e.stopPropagation();
    e.preventDefault();
    lightbox.show(lightboxNode);
  });

  return surface;
};
