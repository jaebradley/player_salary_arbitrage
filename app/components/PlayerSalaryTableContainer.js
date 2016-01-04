var React = require('react');
var PlayerSalaryTable = require('./PlayerSalaryTable');

var PlayerSalaryTableContainer = React.createClass({
	getInitialState: function() {

		return {
			playerSalaryList: [],
			caption: "",
			playerSalaryDataSource: "http:localhost:8000/player_salaries/?salary_min=10000"
		};
	},
	render: function() {

		return (
			<div className="col-sm-6 col-md-offset-3">
				<div className="col-sm-12">
					<h3 className="text-center">Player Salary Differential</h3>
					<PlayerSalaryTable playerSalaryList={this.state.playerSalaryList} caption={this.state.playerSalaryList} playerSalaryDataSource={this.state.playerSalaryDataSource} />
				</div>
			</div>
		);
	}
});

module.exports = PlayerSalaryTableContainer;