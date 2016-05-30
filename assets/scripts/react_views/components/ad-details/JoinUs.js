var React = require('react');
var ReactSurface = require('react-surface');
var FormContent   = require('../../../react_views/form_content');
var TableHeader = require('../../../react_views/components/table_header');

var JoinUsComponent = React.createClass({
  render: function () {
    return (
      <form id='email-form'>
          <span>Sign up and get free contract updates</span>
          <input type='text' />
          <button><span>Sign Up</span></button>
      </form>
    );
  }

});

var settings = {
  headerName: "Developer Signup",
  reactClass: JoinUsComponent
};

module.exports = JoinUsComponent;
