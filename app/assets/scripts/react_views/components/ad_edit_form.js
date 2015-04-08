var React = require('react');
var Quill = require('quill');
var Toolbar = require('./toolbar');

var AdEditForm = React.createClass({
  componentDidMount: function () {
    var node = React.findDOMNode(this);
    var div = node.getElementsByClassName('quill-ad-form')[0];

    var fullEditor = new Quill(div, {
      styles: {
        '.ql-editor': {
          'font-family': "Helvetica, 'Arial', san-serif;",
        }
      },
      modules: {
        'toolbar': { container: '#toolbar-toolbar' },
      },
      theme: 'snow'
    });
  },
  render: function () {
    return (
      <form action="">
        <table border="0">
          <tr className='table-header'>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr >
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
            <td colSpan="6"><Toolbar /></td>
          </tr>

          <tr >
            <td colSpan="2"><label for="location">location</label></td>
            <td colSpan="4"><input type="text" name="location" /></td>
          </tr>

          <tr className='checkboxes'>
            <td colSpan="1"> <label for="full_time">Full Time?</label> </td>
            <td colSpan="1"> <input type="checkbox" name="full_time" /> </td>
            <td colSpan="1"> <label for="part_time">Part Time?</label> </td>
            <td colSpan="1"> <input type="checkbox" name="part_time" /> </td>
            <td colSpan="1"> <label for="contract">Gig?</label> </td>
            <td colSpan="1"> <input type="checkbox" name="contract" /> </td>
          </tr>

          <tr className='checkboxes'>
            <td colSpan="1"> <label for="onsite">Onsite?</label> </td>
            <td colSpan="1"> <input type="checkbox" name="onsite" /> </td>
            <td colSpan="1"> <label for="remote">Remote?</label> </td>
            <td colSpan="1"> <input type="checkbox" name="remote" /> </td>
            <td colSpan="2"><div className='next'><span>Next</span></div></td>
          </tr>
        </table>
      </form>
    );
  }
});

module.exports = AdEditForm;
