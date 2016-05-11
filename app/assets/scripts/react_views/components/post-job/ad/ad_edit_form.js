var React = require("react");
var ReactDOM    = require("react-dom");
var Quill = require("quill");

var Toolbar     = require("../../toolbar");
var TableHeader = require("../../table_header");
var NextButton  = require("../../next_button");

var $ = require("zepto-browserify").$;

var serializeObject = require('../../SerializeObject');

var AdEditForm = React.createClass({
  componentDidMount: function () {
    var form = ReactDOM.findDOMNode(this);
    var div = form.getElementsByClassName('quill-ad-form')[0];

    var fullEditor = new Quill(div, {
      styles: {
        ".ql-editor": {
          "font-family": "Helvetica, 'Arial', san-serif;",
        }
      },
      modules: {
        "toolbar": { container: "#ad-toolbar" },
      },
      theme: "snow"
    });

    var _this = this;
    var $form = $(form);

    $form.on("next-view", function (event) {
      var data = _this.retrieveFormData($form, fullEditor);
      event.data = data;
      //we continue to let the event bubble up
    });
  },

  retrieveFormData: function ($form, quillEditor) {
    var data = serializeObject($form);
    var html = quillEditor.getHTML();
    data.description = html;
    data = this.cleanFormData(data);

    return data;
  },

  cleanFormData: function (data) {
    delete data[""];
    return data;
  },

  render: function () {
    return (
      <form>
        <table border="0">
          <tbody>
            <TableHeader amount={6} />
            <tr>
              <td colSpan="1"> <label for="title">Title</label> </td>
              <td colSpan="5"> <input type="text" name="title" /> </td>
            </tr>
            <tr >
              <td colSpan="6" className='description' ><label for="description">Description</label></td>
            </tr>

            <tr className='quill-row'>
              <td colSpan="6" className='quill-ad-column'><div className='quill-ad-form'></div></td>
            </tr>

            <tr className=''>
              <td colSpan="6"><Toolbar toolbarId="ad-toolbar" /></td>
            </tr>

            <tr >
              <td colSpan="2"><label for="job_location">location</label></td>
              <td colSpan="4"><input type="text" name="job_location" /></td>
            </tr>

            <tr >
              <td colSpan="6" className='description' ><label>Job Type</label></td>
            </tr>
            <tr className='checkboxes'>
              <td colSpan="1"> <label for="full_time">Full Time?</label> </td>
              <td colSpan="1"> <input type="checkbox" name="full_time" /> </td>
              <td colSpan="1"> <label for="part_time">Part Time?</label> </td>
              <td colSpan="1"> <input type="checkbox" name="part_time" /> </td>
              <td colSpan="1"> <label for="contract">Contract?</label> </td>
              <td colSpan="1"> <input type="checkbox" name="contract" /> </td>
            </tr>

            <tr className='checkboxes'>
              <td colSpan="1"> <label for="onsite">Onsite?</label> </td>
              <td colSpan="1"> <input type="checkbox" name="onsite" /> </td>
              <td colSpan="1"> <label for="remote">Remote?</label> </td>
              <td colSpan="1"> <input type="checkbox" name="remote" /> </td>
              <td colSpan="2"> </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
});

module.exports = AdEditForm;
