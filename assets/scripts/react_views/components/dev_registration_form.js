var React = require('react');
var TableHeader = require('./table_header');
var $ = require('zepto-browserify').$;
var serializeObject = require('./SerializeObject');

//var env = require('../../env');
//var githubClientID = env.GITHUB_CLIENT_ID;

var RegistrationReact = React.createClass({
  handleSubmit: function (event) {
    event.preventDefault();
    event.stopPropagation();

    var $form = $('#registration-form');
    var obj   = serializeObject($form);
    if (this.props.login) {
      $form.trigger('user-login', [{user: obj}]);
    } else {
      $form.trigger('user-registration', [{user: obj}]);
    }
  },

  render: function () {
    return (
      <form id="registration-form" onSubmit={this.handleSubmit}>
        <table border="0">
          <TableHeader amount={6} />
          <tr>
             <td colSpan="2"> <label for="email">email</label> </td>
             <td colSpan="4"> <input type="text" name="email" /> </td>
          </tr>

          <tr>
             <td colSpan="2"> <label for="password">password</label> </td>
             <td colSpan="4"> <input type="text" name="password" /> </td>
          </tr>

          { this.props.login ? undefined : <PasswordConfirmation />}

          <tr>
             <td colSpan="6"><button><span>{this.props.submitCopy}</span></button></td>
          </tr>
        </table>
      </form>
    );
  }
});

var PasswordConfirmation = React.createClass({
  render: function () {
    return (
      <tr>
         <td colSpan="2"> <label for="password_confirmation">password confirmation</label> </td>
         <td colSpan="4"> <input type="text" name="password_confirmation" /> </td>
      </tr>
    );
  }
});
module.exports = RegistrationReact;
