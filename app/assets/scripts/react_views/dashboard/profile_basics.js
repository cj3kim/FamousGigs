var React = require('react');

var ProfileBasics = React.createClass({
  render: function () {
    return (
      <div id='profile-basics' className="dashboard stop-gap-div">
        <div className="title row">
          <span>Profile Basics</span>
        </div>
        <div className="form row">
          <form action="">
            <table border="0">
              <tr>
                <td><label for="name">name</label></td>
                <td><input type="text" name="name" value="" /></td>
              </tr>

              <tr>
                <td><label for="email">email</label></td>
                <td><input type="text" name="email" value="" /></td>
              </tr>

              <tr>
                <td><label for="password">password</label></td>
                <td><input type="password" name="password" value="" /></td>
              </tr>

              <tr>
                <td><label for="phone">phone</label></td>
                <td><input type="text" name="phone"    value="" /></td>
              </tr>

              <tr>
                <td><label for="company">company</label> </td>
                <td><input type="text" name="company"  value="" /></td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    );
  }
});




module.exports = ProfileBasics;
