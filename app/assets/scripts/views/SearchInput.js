var InputSurface = require('famous/surfaces/InputSurface');

var searchInput = new InputSurface({
  size: [200, 56],
  placeholder: "Search by Location",
});

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

searchInput.on('keyup', function () {
  delay(function () {
    var inputValue = searchInput.getValue()
    searchInput.emit("filter-string", inputValue)
  }, 1000);
})

module.exports = searchInput;





