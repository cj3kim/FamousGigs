var React = require('react');
var Quill = require('quill');
var Toolbar = require('./toolbar');
var TableHeader = require('./table_header');
var NextButton = require('./next_button');

var $ = require('zepto-browserify').$;

function serializeObject($form) {
   var o = {};
   var a = $form.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
}

var AdEditForm = React.createClass({
  componentDidMount: function () {
    var form = React.findDOMNode(this);
    var div = form.getElementsByClassName('quill-ad-form')[0];

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

    var _this = this;
    var $form = $(form);

    $form.on('next-view', function (event) {
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
            <td colSpan="2"> <NextButton /> </td>
          </tr>
        </table>
      </form>
    );
  }
});

module.exports = AdEditForm;
