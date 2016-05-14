var React = require('react');
var ReactSurface = require('react-surface');
var FormContent   = require('../../../react_views/form_content');
var TableHeader = require('../../../react_views/components/table_header');

var JoinUsComponent = React.createClass({
  render: function () {
    return (
      <form id='email-form'>
        <table border="0">
          <TableHeader amount={6} />
          <tr>
            <td colSpan="6"> <span> Sign up and get free contract updates </span> </td>
          </tr>

          <tr>
            <td colSpan="6"> <input type='text' /> </td>
          </tr>
          <tr>
            <td colSpan="3"></td>
            <td colSpan="3"> <button> <span>Sign Up </span></button> </td>
          </tr>
        </table>
      </form>
    );
  }

});

var settings = {
  headerName: "Developer Signup",
  reactClass: JoinUsComponent
};

module.exports = JoinUsComponent;
