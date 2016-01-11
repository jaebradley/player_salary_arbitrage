var React = require('react');
var PlayerSalaryTable = require('./PlayerSalaryTable');
var Moment = require('moment');
var DatePicker = require('react-datepicker');

var PlayerSalaryTableContainer = React.createClass({
	getInitialState: function() {

		return {
			estDate: Moment.utc().utcOffset(-5).startOf('day')
		};
	},

	handleDateSelection: function (date) {
		this.setState({
		  estDate: date.utc().utcOffset(-5).startOf('day')
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
						selected={this.state.estDate}
						onChange={this.handleDateSelection}
					/>
				</div>
				<PlayerSalaryTable 
					estDate={this.state.estDate}
				/>
			</div>
		);
	}
});

module.exports = PlayerSalaryTableContainer;