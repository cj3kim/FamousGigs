function FormFairy () {
  this.data = {}
}

FormFairy.prototype.addData = function (obj) {
  if (obj.tableName === undefined) {
    throw Error("No tableName")
  } else {
    this.data[obj.tableName] = obj;
    delete obj["tableName"]
    return this.data;
  }
};


module.exports = FormFairy

