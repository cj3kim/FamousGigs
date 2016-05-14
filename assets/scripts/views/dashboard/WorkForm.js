var React        = require('react');
var ReactSurface = require('react-surface');
var FormContent = require('../../react_views/form_content');

var Promise = require('bluebird');
var TableHeader = require('../../react_views/components/table_header');
var url = require('url');
var $ = require('zepto-browserify').$;
var page = require('page');

var S3Mixin = require('../S3Mixin');
var notificationBox = require('../notification/index');
var Dropzone = require('react-dropzone');
var DropzoneMixin = require('../../react_views/dropzone_mixin');

var WorkFormComponent = React.createClass({
  mixins: [S3Mixin, DropzoneMixin],
  componentDidMount: function () {
    var user = require('../../models/singleton/user');
    this.user = user;

    this.form = React.findDOMNode(this);
    this.progress = this.form.getElementsByTagName('progress')[0];
    this.work_url = '';
  },
  dropCallback: function (resourceUrl) {
    this.work_url = resourceUrl;
  },

  onDrop: function (files) {
    var mediaType = form.getElementsByTagName('select')[0].value;

    var filePath = 'users/' + this.user.get('id') + '/' + mediaType + '/';
    var fileSizeLimit = 2097152;
    this.dropAndLoad(files, filePath, fileSizeLimit,  this.dropCallback.bind(this));
  },

  handleSubmit: function (e) {
    e.stopPropagation();
    e.preventDefault();

    var file  = this.form.getElementsByClassName('media-upload')[0].files[0];
    var title = this.form.getElementsByClassName('work-title')[0].value;
    var mediaType = form.getElementsByTagName('select')[0].value;
    
    var workModel = new this.user.works.model({
      work: {title: title, media_type: mediaType, url: this.work_url }
    });

    workModel.collection = this.user.works;

    Promise.resolve(workModel.save())
      .then(function () {
        page.show('/dashboard/portfolio');
      });
  },

  render: function () {
    return (
      <form id="work-form" onSubmit={this.handleSubmit}>
        <table>
          <TableHeader amount="6" />

          <tr>
            <td colSpan="2"><label for="title">Title</label> </td>
            <td colSpan="4"><input className='work-title' type="text" name="title" /></td>
            </tr>
          <tr>
            <td colSpan="3"><label for="media_type">Media Type</label> </td>
            <td colSpan="3">
              <select name="select">
                <option value="mov">mov</option>
                <option value="jpeg">jpeg</option>
                <option value="gif">gif</option>
                <option value="png">png</option>
              </select>
            </td>
            </tr>
          <tr>
            <td colSpan="2"><label>Media Upload</label></td>
            <td colSpan="4"><progress value="0" max="100"></progress></td>
          </tr>

          <tr>
            <td colSpan="6">
              <Dropzone onDrop={this.onDrop} style={{width: '100%', height: '150px', border: '1px dotted #41aec2', marginTop: '10px'}} >
                <div className='dropzone-message'>
                  Drop your work here, or click to select from your computer. 
                  </div>
                <img id="dropzone-image" style={{ display: 'none' }} />

              </Dropzone>
            </td>
          </tr>

          <tr>
            <td colSpan="2"></td>
            <td colSpan="2"></td>
            <td colSpan="2">
              <button className='work-submit' type="submit">
                <span>Add</span>
              </button>
              </td>
            </tr>
        </table>
      </form>
    );
  }
});


var props = {
  headerName: "Add Work",
  reactClass: WorkFormComponent
};

var WorkForm = new ReactSurface({
  classes: ['rounded-corners'],
  content: <FormContent {...props} />
});

module.exports = WorkForm;
