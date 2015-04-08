var React = require('react');

var TableHeader = React.createClass({
  render: function () {
    var createTd = function() {
      return <td></td>;
    };
    var amount = this.props.amount;
    var tds = [];

    for (var i = 0, l = amount; i < l; i ++) {
      tds.push(createTd());
    }

    return (
      <tr className='table-header'>
      {tds}
      </tr>
    );
  }
});

module.exports = TableHeader;
