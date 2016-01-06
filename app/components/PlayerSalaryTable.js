var React = require('react');
var PlayerSalaryTableRow = require('./PlayerSalaryTableRow');
var $ = require('jquery');
var Q = require('q');
var Client = require('../data/Client');

var PlayerSalaryTable = React.createClass({
	getInitialState: function() {

		return {
			playerSalaryList: []
		};
	},



	parsePlayerSalaryData: function(data) {
		var parsedPlayerSalaryData = [];
		for (var i = 0; i < data.results.length; i++) {
			var playerData = data.results[i].player;
			var gameData = data.results[i].game;
			var salary = data.results[i].salary;
			var siteData = data.results[i].site;
			// var firstName = playerData[0].first_name;
			// var lastName = playerData[0].last_name;
			var gameStartTime = gameData[0].start_time;
			var key = playerData + "|" + gameData;
			parsedPlayerSalaryData[key] = salary;
		}
		return parsedPlayerSalaryData;
	},

	// componentWillMount() {
	// 	var that = this;
	// 	Client.getData("https://nba-persistence.herokuapp.com/player_salaries/?salary_min=10000").then(function(data) {
	// 		var results = function(data) {
	// 			var parsedPlayerSalaryData = [];
	// 			for (var i = 0; i < data.results.length; i++) {
	// 				var playerData = data.results[i].player;
	// 				var gameData = data.results[i].game;
	// 				var salary = data.results[i].salary;
	// 				var siteData = data.results[i].site;
	// 				// var firstName = playerData[0].first_name;
	// 				// var lastName = playerData[0].last_name;
	// 				var gameStartTime = gameData[0].start_time;
	// 				var key = playerData + "|" + gameData;
	// 				parsedPlayerSalaryData[key] = salary;
	// 			}
	// 			return parsedPlayerSalaryData;
	// 		};

	// 		that.setState({playerSalaryList: results(data)});
	// 	});
		
	// },

	componentDidMount: function() {
	    $.ajax({
	      url: "https://nba-persistence.herokuapp.com/player_salaries/?salary_min=10000",
	      dataType: 'jsonp',
	      cache: false,
	      success: function(data) {
	        this.setState({playerSalaryList: data.results});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },


	render: function() {
		console.log(this.state.playerSalaryList);
		var playerSalaryList = [];
		for (var i = 0; i < this.state.playerSalaryList.length; i++) {
			playerSalaryList.push(
				<PlayerSalaryTableRow 
					name={"foo"} 
					teamAbbreviation={"foo"} 
					gameStartTime={"foo"} 
					draftkingsSalary={"foo"} 
					fanduelSalary={"foo"} 
					difference={"foo"}  />
			);
		};

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