var React = require('react');
var ReactSurface = require('react-surface');
var View = require('famous/core/View');
var FamousGigsDispatcher = require('../../dispatcher');
var user = require('../../models/singleton/user');

var $ = require('zepto-browserify').$;
var Dropzone = require('react-dropzone');
var S3Mixin = require('../S3Mixin');
var DropzoneMixin = require('../../react_views/dropzone_mixin');

var ProfileBasicsReact = React.createClass({
  mixins: [S3Mixin, DropzoneMixin],
  componentDidMount: function () {
    var _this = this;
    this.user = user;
    var div = React.findDOMNode(this);
    this.$div = $(div);
    this.progress = div.getElementsByTagName('progress')[0];

    _this.setState({ email: user.get('email')});
  },

  getInitialState: function () {
    return {
      disabled: false,
      email: user.get('email'),
      user_name: user.get('user_name')
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    e.stopPropagation();

    var obj = {
      email:     this.$div.find('input[name=email]').val(),
      user_name: this.$div.find('input[name=user_name]').val()
    };

    Promise.resolve(this.user.save(obj));
  },

  dropCallback: function (resourceUrl) {
    this.user.set({avatar_url: resourceUrl });
  },

  onDrop: function (files) {
    var filePath = 'users/' + user.get('id') + '/' + 'avatars' + '/';
    var fileSizeLimit = 2100000;
    this.dropAndLoad(files, filePath, fileSizeLimit, this.dropCallback);
  },

  render: function () {
    var email = this.state.email;
    var user_name = this.state.user_name;

    return (
      <div  className="profile stop-gap-div">
        <div className="title row">
          <span>Profile Basics</span>
        </div>
        <div id="profile-basics" className="form row">
          <form onSubmit={this.handleSubmit}>
            <table border="0">
              <tr>
                <td colSpan="2"><label for="name">user name</label></td>
                <td colSpan="4"><input type="text" name="user_name" value={user_name} disabled={this.state.disabled }/></td>
                </tr>

              <tr>
                <td colSpan="2"><label for="email">email</label></td>
                <td colSpan="4"><input type="text" name="email" value={email} disabled={this.state.disabled } /></td>
                </tr>

              <tr>
                <td colSpan="2"><label>Avatar Upload</label></td>
                <td colSpan="4"><progress value="0" max="100"></progress></td>
                </tr>

              <tr>
                <td colSpan="6">
                  <Dropzone onDrop={this.onDrop} style={{width: '100%', height: '150px', border: '1px dotted #41aec2', marginTop: '10px'}} >
                    <div className='dropzone-message'>
                      Drop your profile picture here, or click to select from your computer. 
                      </div>

                    <img id="dropzone-image" style={{ display: 'none' }} />

                    </Dropzone>
                  </td>
                </tr>
              <tr>
                <td colSpan="4"></td>
                <td colSpan="2">
                  <button className='update-profile' type="submit">
                    <span>Update Profile</span>
                  </button></td>
                </tr>
            </table>
          </form>
        </div>
      </div>
    );
  }
});


function ProfileBasics() {
  View.apply(this, arguments);

  var pbr = <ProfileBasicsReact />

  this.surface = new ReactSurface({
    size: [300, true],
    classes: ['rounded-corners'],
    content: pbr
  });

  this._node.add(this.surface);
}

ProfileBasics.prototype = Object.create(View.prototype);
ProfileBasics.prototype.constructor = View;

module.exports = ProfileBasics;


