var React        = require('react');
var ReactSurface = require('react-surface');
var FormContent = require('../../react_views/form_content');

var Promise = require('bluebird');
var TableHeader = require('../../react_views/components/table_header');
var url = require('url');
var $ = require('zepto-browserify').$;

var WorkFormComponent = React.createClass({
  componentDidMount: function () {
    var user = require('../../models/singleton/user');
    this.user = user;
  },
  handleSubmit: function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.initialUpload();
  },

  initialUpload: function () {
    var _this = this;

    if (file === null)
      alert("No file selected");

    var form  = React.findDOMNode(this);
    var file  = form.getElementsByClassName('media-upload')[0].files[0];
    var title = form.getElementsByClassName('work-title')[0].value;
    var mediaType = form.getElementsByTagName('select')[0].value;

    var signPromise = this.getSignedRequest(file)

    signPromise
      .then(function (response) {
        return Promise.resolve(_this.uploadToS3(file, response.signed_request, response.url));
      })
      .then(function (xhr) {
        var parsedUrl   = url.parse(xhr.responseURL);
        var resourceUrl = parsedUrl.protocol + '//' + parsedUrl.hostname + parsedUrl.pathname;

        var workModel = new _this.user.works.model({
          work: {
            title: title,
            media_type: mediaType,
            url: resourceUrl
          }
        });
        workModel.collection = _this.user.works;
        return Promise.resolve(workModel.save());
      })
      .then(function (model) {
        console.log(model);
      })
      .catch(function (err) {
        console.debug("There was an error in WorkFormComponent");
        console.log(err);
      });
  },
  getSignedRequest: function (file) {
    var userSession = JSON.parse(sessionStorage.user);
    console.log('getSignedRequest');

    console.log('userSession.token: ' + userSession.token);
    console.log(file);
    console.log('file type: ' + file.type);

    return Promise.resolve(
      $.ajax({
        type: 'GET',
        url: '/api/sign_s3',
        data: {file_name: file.name, file_type: file.type},
        headers: {'Authorization' : "Bearer " + userSession.token }})
    );
  },

  uploadToS3: function (file, signedRequest, url) {

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", signedRequest);
      //HEADERS have to reflect the ones on the server.
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.setRequestHeader('Expires', 600);

      xhr.onload = function () {
        var headers = xhr.getAllResponseHeaders().toLowerCase();
        if (xhr.status === 200)
          resolve(xhr);
      };
      xhr.onerror = function () {
        reject(xhr.error);
      };
      xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
          var percentComplete = e.loaded / e.total;
          console.log(percentComplete);
        }
      })
      xhr.send(file.slice());
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
                <option value="mov">.mov</option>
                <option value="jpeg">jpeg</option>
                <option value="gif">gif</option>
                <option value="png">png</option>
              </select>
            </td>
            </tr>

          <tr>
            <td colSpan="2"><label for="media_upload">Upload</label> </td>
            <td colSpan="4"><input className='media-upload' type="file" name="media_upload" /></td>
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


var props = {
  headerName: "Add Work",
  reactClass: WorkFormComponent
};

var WorkForm = new ReactSurface({
  classes: ['rounded-corners'],
  content: <FormContent {...props} />
});

module.exports = WorkForm;
