
var React = require('react');

var AdForm = React.createClass({
  render: function () {
    return (
      <div  className="box stop-gap-div">
        <div className="title row">
          <span>Ad Form</span>
        </div>
        <div id="" className="form row">
          <form action="">
            <table border="0">
              <tr>
                <td><label for="title">Title</label></td>
                <td><input type="text" name="title" /></td>
              </tr>

              <tr>
                <td><label for="description">Description</label></td>
                <td><input type="text" name="description"  /></td>
              </tr>

              <tr>
                <td><label for="location">location</label> </td>
                <td><input type="text" name="location" /></td>
              </tr>

              <tr>
                <td><label for="remote">Remote?</label> </td>
                <td><input type="text" name="remote" /></td>
              </tr>

              <tr>
                <td><label for="company_logo">Company Logo</label> </td>
                <td><input type="text" name="company_logo" /></td>
              </tr>

            </table>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = AdForm;
