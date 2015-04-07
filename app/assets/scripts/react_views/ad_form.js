
var React = require('react');
var Quill = require('quill');
var Toolbar = require('./components/toolbar');


var AdForm = React.createClass({
  componentDidMount: function (one, two) {
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
      <div  id="ad-form" className="stop-gap-div">
        <div className="title row">
          <span>Ad Form</span>
        </div>
        <form className="row" action="">
          <table border="0">
            <tr className='normal'>
              <td> <label for="title">Title</label> </td>
              <td> <input type="text" name="title" /> </td>
            </tr>

            <tr className='normal'>
              <td colSpan="2"><label for="description">Description</label></td>
            </tr>

            <tr>
              <td colSpan="2">
                <Toolbar />
              </td>
            </tr>

            <tr className='quill-row'>
              <td colSpan="2" className='quill-ad-column'> 
                <div className='quill-ad-form'> </div>
              </td>
            </tr>

            <tr className='normal'>
              <td><label for="location">location</label></td>
              <td><input type="text" name="location" /></td>
            </tr>

            <tr className='normal'>
              <td> <label for="remote">Remote?</label> </td>
              <td> <input type="checkbox" name="remote" /> </td>
            </tr>

            <tr className='normal'>
              <td><label for="company_logo">Company Logo</label> </td>
              <td><input type="file" name="company_logo" /></td>
            </tr>

            <tr className='normal'>
              <td><img src="http://placehold.it/260x150" /></td>
            </tr>
          </table>
        </form>

      </div>
    );
  }
});

module.exports = AdForm;
