var React = require('react');
var TableHeader = require('./table_header');
var $ = require('zepto-browserify').$;
var serializeObject = require('./SerializeObject');

var RegistrationReact = React.createClass({
  componentDidMount: function () {
  },
  handleSubmit: function (event) {
    console.log('handleSubmit: ' + event);
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
            <td colSpan="3"><button><span>Sign in with Github </span></button></td>
            <td colSpan="3"><button><span>Sign in with Facebook</span></button></td>
          </tr>

          <tr>
            <td colSpan="6" style={{textAlign: "center"}}><span>or</span></td>
          </tr>

          <tr>
            <td colSpan="2"> <label for="user_name">User Name</label> </td>
            <td colSpan="4"> <input type="text" name="user_name" /> </td>
          </tr>

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
