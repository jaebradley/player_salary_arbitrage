var React = require('react');
var PlayerSalaryTableRow = require('./PlayerSalaryTableRow');
var $ = require('jquery');
var Q = require('q');

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
		    	return data.results;
	    	},
		    error: function (xhr, ajaxOptions, thrownError) {
		      alert(xhr.status);
		      alert(thrownError);
		    }
		});
	},

	getData: function(url) {
		var deferred = Q.defer();
		$.ajax({
		    type: "GET",
		    url: url,
		    dataType: "jsonp",
		    success: function() {
	            deferred.resolve();
	        }
		});
		return deferred.promise;
	},

	returnDataResults: function(url) {
		console.log(this.getData(url).then(function(data) {
			return data;
		}));
	},

	parsePlayerSalaryData: function() {
		var parsedPlayerSalaryData = [];
		playerSalaryData = this.returnDataResults("https://nba-persistence.herokuapp.com/player_salaries/?salary_min=10000");
		for (var i = 0; i < playerSalaryData.length; i++) {
			var playerData = returnDataResults(playerSalaryData[i].player);
			var gameData = returnDataResults(playerSalaryData[i].game);
			var salary = playerSalaryData[i].salary;
			var siteData = playerSalaryData[i].site;
			var firstName = playerData[0].first_name;
			var lastName = playerData[0].last_name;
			var gameStartTime = gameData[0].start_time;
			var key = firstName + "|" + lastName + "|" + gameStartTime;
			parsedPlayerSalaryData[key] = salary;
		}
		return parsedPlayerSalaryData;
	},


	render: function() {
		playerSalaryData = this.parsePlayerSalaryData();
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