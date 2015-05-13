var React        = require('react');
var ReactSurface = require('react-surface');

var TableHeader = require('./table_header');
var WorkFormComponent = React.createClass({
  render: function () {
    return (
      <form id="work-form" onSubmit={this.handleSubmit}>
        <table>
          <TableHeader amount="6" />

          <tr>
            <td colSpan="2"><label for="title">Title</label> </td>
            <td colSpan="4"><input type="text" name="title" /></td>
            </tr>

          <tr>
            <td colSpan="2"><label for="media_type">Media Type</label> </td>
            <td colSpan="4">
              <select name="select">
                <option value="mov"> video</option> 
                <option value="jpeg">jpeg </option>
                <option value="gif"> gif  </option>
                <option value="png"> png  </option>
              </select>
            </td>
            </tr>

          <tr>
            <td colSpan="2"><label for="file_upload">Upload</label> </td>
            <td colSpan="4"><input type="file" name="file_upload" /></td>
            </tr>

          <tr>
            <td colSpan="2"></td>
            <td colSpan="2"></td>
            <td colSpan="2">
              <button className='work-submit' type="submit">
                <span>Add</span>
              </button></td>

            </tr>
        </table>
      </form>
    );
  }
});

var FormContent = require('../react_views/form_content');

var props = {
  headerName: "Add Work",
  ReactClass: WorkFormComponent
};

var WorkForm = new ReactSurface({
  size: [undefined, 150],
  content: <FormContent { ...props } />
});

module.exports = WorkForm;
