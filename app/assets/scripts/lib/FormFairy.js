var objectMerge = require('object-merge');

function FormFairy () {
  this.data = {}
}

FormFairy.prototype.addData = function (obj) {
  var tableName = obj.tableName;
  if (tableName === undefined) {
    throw Error("No tableName")
  } else {
    if (tableName in this.data) {
      this.data[tableName] = objectMerge(this.data[tableName], obj);
    } else {
      this.data[obj.tableName] = obj;
      delete obj["tableName"]
    }

    console.log('form fairy');
    console.log(this.data);
    return this.data;
  }
};


module.exports = FormFairy

