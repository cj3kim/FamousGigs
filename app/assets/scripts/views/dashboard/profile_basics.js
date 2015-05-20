var React = require('react');
var ReactSurface = require('react-surface');
var View = require('famous/core/View');
var FamousGigsDispatcher = require('../../dispatcher');
var user = require('../../models/singleton/user');

var ProfileBasicsReact = React.createClass({
  componentDidMount: function () {
    var _this = this;

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
                <td><label for='image-upload'>Image Upload</label></td>
                <td><input type='file' name='image-upload'/> </td>
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


