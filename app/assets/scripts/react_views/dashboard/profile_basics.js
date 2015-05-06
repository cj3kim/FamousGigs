var React = require('react');

var ProfileBasics = React.createClass({
  componentDidMount: function () {
  },
  render: function () {
    return (
      <div  className="dashboard stop-gap-div">
        <div className="title row">
          <span>Profile Basics</span>
        </div>
        <div id="profile-basics" className="form row">
          <form action="">
            <table border="0">
              <tr>
                <td><label for="name">name</label></td>
                <td><input type="text" name="name" /></td>
              </tr>

              <tr>
                <td><label for="email">email</label></td>
                <td><input type="text" name="email"  /></td>
              </tr>

              <tr>
                <td><label for="password">password</label></td>
                <td><input type="password" name="password" /></td>
              </tr>

              <tr>
                <td><label for="phone">phone</label></td>
                <td><input type="text" name="phone" /></td>
              </tr>

              <tr>
                <td><label for="company">company</label> </td>
                <td><input type="text" name="company" /></td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    );
  }
});




module.exports = ProfileBasics;
