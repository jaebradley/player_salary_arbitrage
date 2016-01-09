var React = require('react');
var PlayerSalaryTable = require('./PlayerSalaryTable');
var Moment = require('moment');
var DatePicker = require('react-datepicker');

var PlayerSalaryTableContainer = React.createClass({
	getInitialState: function() {

		return {
			utcDate: Moment.utc()
		};
	},

	handleDateSelection: function (date) {

		this.setState({
		  utcDate: date
		});
	},

	render: function() {

		return (
			<div>
				<h3 className="text-center">Player Salary Differential</h3>
				<DatePicker
					selected={this.state.utcDate}
					onChange={this.handleDateSelection}
				/>
				<PlayerSalaryTable 
					utcDate={this.state.utcDate}
				/>
			</div>
		);
	}
});

module.exports = PlayerSalaryTableContainer;