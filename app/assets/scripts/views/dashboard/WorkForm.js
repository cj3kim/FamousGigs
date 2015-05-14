var React        = require('react');
var ReactSurface = require('react-surface');
var FormContent = require('../../react_views/form_content');

var Promise = require('bluebird');
var TableHeader = require('../../react_views/components/table_header');
var $ = require('zepto-browserify').$

var WorkFormComponent = React.createClass({
  handleSubmit: function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.initialUpload();
  },
  initialUpload: function () {
    var _this = this;
    var form  = React.findDOMNode(this);
    var searchAry = form.getElementsByClassName('media-upload');
    var file  = searchAry[0];
    if (file === null)
      alert("No file selected");

    var signPromise = this.getSignedRequest(file)

    signPromise
      .then(function (response) {
        return Promise.resolve(_this.uploadToS3(file, response.signed_request, response.url));
      })
      .then(function (response) {
        console.log(response);
        console.log(response.url);
        //fire an event to add item to portfolio.
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

    return Promise.resolve(
      $.ajax({
        type: 'GET',
        url: '/api/sign_s3',
        data: {file_name: file.name, file_type: file.type },
        headers: {'Authorization' : "Bearer " + userSession.token }})
    );
  },

  uploadToS3: function (file, signedRequest, url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      console.log('signedRequest: ' + signedRequest);
      xhr.open("POST", signedRequest);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.onload = function () {
        console.log('xhr');
        console.log(xhr);
        var headers = xhr.getAllResponseHeaders().toLowerCase();
        console.log(headers);
        if (xhr.status === 200)
          resolve(xhr);
      };
      xhr.onerror = function () {
        console.log('xhr');
        console.log(xhr);
        reject(xhr.error);
      };
      xhr.send(file);
    });
  },
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
