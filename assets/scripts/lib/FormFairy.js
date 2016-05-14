var objectMerge = require('object-merge');
var deepcopy = require('deepcopy');

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
    }
    return this.data;
  }
};
FormFairy.prototype.get = function (tableName) {
  var obj = deepcopy(this.data[tableName]);

  for ( var key in obj) {
    var value = obj[key];
    if (value === "on") obj[key] = true;
    if (key === 'tableName') 
      delete obj[key];
  }
  return obj;
}


module.exports = FormFairy

