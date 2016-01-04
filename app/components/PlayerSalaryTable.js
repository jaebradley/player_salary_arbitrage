var React = require('react');
var PlayerSalaryTableRow = require('./PlayerSalaryTableRow');
var $ = require('jquery');

var PlayerSalaryTable = React.createClass({
	getInitialState: function() {

		return {
			playerSalaryList: []
		};
	},
	getPlayerSalaryData: function() {
		$.ajax({
		    type: "GET",
		    url: "https://nba-persistence.herokuapp.com/player_salaries/?salary_min=10000",
		    dataType: "jsonp",
		    success: function(data) {
		    	console.log(data);
	    	},
		    error: function (xhr, ajaxOptions, thrownError) {
		      alert(xhr.status);
		      alert(thrownError);
		    }
		});
	},


	render: function() {
		this.getPlayerSalaryData();
		var playerSalaryList = [];
		this.props.playerSalaryList.forEach(function(playerSalary) {
			playerSalaryList.push(
				<PlayerSalaryTableRow 
					name={playerSalary.name} 
					teamAbbreviation={playerSalary.teamAbbreviation} 
					gameStartTime={playerSalary.gameStartTime} 
					draftkingsSalary={playerSalary.draftkingsSalary} 
					fanduelSalary={playerSalary.fanduelSalary} 
					difference={playerSalary.difference} />
			);
		}.bind(this));

		return (
			<table className="playerSalaryList">
				<caption>{this.props.caption}</caption>
				<tbody>
					{playerSalaryList}
				</tbody>
			</table>
		);
	}
});

module.exports = PlayerSalaryTable;