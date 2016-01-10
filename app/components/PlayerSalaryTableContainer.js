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
		var datePickerStyle = {
			width: "15%"
		};

		return (
			<div>
				<div className="date-selection">
					<DatePicker
						style={datePickerStyle}
						selected={this.state.utcDate}
						onChange={this.handleDateSelection}
					/>
				</div>
				<PlayerSalaryTable 
					utcDate={this.state.utcDate}
				/>
			</div>
		);
	}
});

module.exports = PlayerSalaryTableContainer;