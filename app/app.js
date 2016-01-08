var ReactDOM = require('react-dom');
var React = require('react');
var PlayerSalaryTableContainer = require('./components/PlayerSalaryTableContainer');

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <PlayerSalaryTableContainer />
      </div>
    )
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
)