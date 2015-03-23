var React = require('react');

var Navbar = React.createClass({
  render: function () {
    return (
      <div className='navbar'>
        <h1><span>famous</span>gigs</h1>
        <h3><span className='flaticon-purchase1'></span> Gigs/Jobs</h3>
        <h3><span className='flaticon-gears3'></span>  Developers</h3>
        <h3><span className='flaticon-sheet3'></span>  Post</h3>
      </div>
    );
  }
});

module.exports = Navbar;
