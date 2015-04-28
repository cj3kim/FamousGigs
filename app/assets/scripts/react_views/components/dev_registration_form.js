var React = require('react');
var TableHeader = require('./table_header');
var $ = require('zepto-browserify').$;

var RegistrationReact = React.createClass({
  componentDidMount: function () {
  },

  render: function () {
    return (
      <form>
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

          <tr>
             <td colSpan="2"> <label for="password_confirmation">password confirmation</label> </td>
             <td colSpan="4"> <input type="text" name="password_confirmation" /> </td>
          </tr>

          <tr>
             <td colSpan="6"><button><span>Sign Up</span></button></td>
          </tr>
        </table>
      </form>
    );
  }
});

module.exports = RegistrationReact;
