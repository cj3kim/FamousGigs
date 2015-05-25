
var React = require('react');
var ReactSurface = require('react-surface');

var AdInformation = React.createClass({
  render: function () {
    return (
      <div className='ad-information stop-gap-div'>
        <img className='company-logo' src='/public/images/cats.jpg'/>

        <div className='apply-now-btn'>
          APPLY
        </div>

        <div className='details'> 
          <span>DETAILS</span>
          <ul>
            <li><span className='flaticon-building104 icon'></span> Company </li>
            <li><span className='flaticon-pin71 icon'></span> Oakland, CA</li>
            <li><span className='flaticon-wifi11 icon'></span> Remote Working Ok</li>
          </ul>
        </div>

        <div className='contact'> 
          <span>CONTACT</span>
          <ul>
            <li> <span className='flaticon-user91 icon'></span> Chris Kim </li>
            <li>  <span className='flaticon-mail59 icon'></span> chris@wundercode.net </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = AdInformation;
