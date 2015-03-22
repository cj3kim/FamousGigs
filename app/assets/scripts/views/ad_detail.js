
function AdDetails(context) {
  View.apply(this, arguments);

}

AdDetails.prototype = Object.create(View.prototype);
AdDetails.prototype.constructor = View;

modules.export = AdDetails;
