
var React = require('react');

var AdForm = React.createClass({
  render: function () {
    return (
      <div  id="ad-form" className="box stop-gap-div">
        <div className="title row">
          <span>Ad Form</span>
        </div>

        <form className="row"action="">
          <table border="0">
            <tr>
              <td>
                <label for="title">Title</label>
              </td>
              <td>
                <input type="text" name="title" />
              </td>
            </tr>

            <tr>
              <td><label for="description">Description</label></td>
            </tr>
            <tr>
              <td><textarea className="description" type="text" name="description" /></td>
            </tr>
            <tr>
              <td>
                <label for="location">location</label>
              </td>
              <td>
                <input type="text" name="location" />
              </td>
            </tr>

            <tr>
              <td>
                <label for="remote">Remote?</label>
              </td>
              <td>
                <input type="checkbox" name="remote" />
              </td>
            </tr>

            <tr>
              <td><label for="company_logo">Company Logo</label> </td>
              <td><input type="file" name="company_logo" /></td>
            </tr>

            <tr>
              <td><img src="http://placehold.it/260x150" /></td>
            </tr>
          </table>
        </form>
      </div>
    );
  }
});

module.exports = AdForm;
