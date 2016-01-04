var React = require('react');
var PlayerSalaryTableContainer = require('./components/PlayerSalaryTableContainer');

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <PlayerSalaryTableContainer />
        </div>
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)