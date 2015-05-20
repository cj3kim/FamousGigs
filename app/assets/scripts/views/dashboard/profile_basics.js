var React = require('react');
var ReactSurface = require('react-surface');
var View = require('famous/core/View');
var FamousGigsDispatcher = require('../../dispatcher');
var user = require('../../models/singleton/user');

var S3Mixin = require('../S3Mixin');

var ProfileBasicsReact = React.createClass({
  mixins: [S3Mixin],
  componentDidMount: function () {
    var _this = this;
    this.user = user;
    var div = React.findDOMNode(this);
    this.progress = div.getElementsByTagName('progress');
    _this.setState({ email: user.get('email')});
  },

  getInitialState: function () {
    return {
      disabled: '',
      email: user.get('email'),
    };
  },
  handleEmailChange: function (event) {
    this.setState({email: event.target.value});
  },

  handleFileChange: function (e) {
    e.stopPropagation();
    e.preventDefault();
    var _this = this;
    var div   = React.findDOMNode(this);
    var file  = div.getElementsByClassName('avatar-upload')[0].files[0];
    var filePath = 'users/' + user.get('id') + '/' + 'avatars' + '/';
    this.initialUpload(file, filePath)
      .then(function (resourceUrl) {
        _this.user.set({avatar_url: resourceUrl });
        return Promise.resolve(_this.user.save());
      })
      .then(function (model) {
        alert('avatar image uploaded');
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  render: function () {
    var email = this.state.email;

    return (
      <div  className="profile stop-gap-div">
        <div className="title row">
          <span>Profile Basics</span>
        </div>
        <div id="profile-basics" className="form row">
          <form action="">
            <table border="0">
              <tr>
                <td><label for="name">user name</label></td>
                <td><input type="text" name="name" disabled={this.state.disabled }/></td>
                </tr>

              <tr>
                <td><label for="email">email</label></td>
                <td><input type="text" name="email" value={email} disabled={this.state.disabled } /></td>
                </tr>
              <tr>
                <td><label for='image-upload'>Avatar Upload</label></td>
                <td><input type='file' onChange={this.handleFileChange} className='avatar-upload'/> </td>
                </tr>
              <tr>
                <td><label>Progress</label></td>
                <td><progress value='0' max='100'> </progress> </td>
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
    size: [450, 315],
    classes: ['rounded-corners'],
    content: pbr
  });

  this._node.add(this.surface);
}

ProfileBasics.prototype = Object.create(View.prototype);
ProfileBasics.prototype.constructor = View;

module.exports = ProfileBasics;


