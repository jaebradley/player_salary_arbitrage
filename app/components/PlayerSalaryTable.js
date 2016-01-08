"use es6";

var React = require('react');
var PlayerSalaryTableRow = require('./PlayerSalaryTableRow');
var Store = require('../stores/Store');
var ActionCreator = require('../actions/ActionCreator');
var HashMap = require('hashmap');
var Reactable = require('reactable');
var Table = Reactable.Table;
var Thead = Reactable.Thead;
var Th = Reactable.Th;
var Td = Reactable.Td;

var PlayerSalaryTable = React.createClass({
	getInitialState: function() {
		return {
			playerSalaryList: []
		};
	},

	componentWillMount: function () {
	    Store.addChangeListener(this._onChange);
	},

	componentDidMount: function () {
		ActionCreator.getPlayerSalaries();
		this.setState({
		  playerSalaryList: Store.getPlayerSalaries()
		});
	},

	componentWillUnmount: function () {
		Store.removeChangeListener(this._onChange);
	},

	_onChange: function () {
		this.setState({
		  playerSalaryList: Store.getPlayerSalaries()
		});
	},

	returnPlayerSalaryMap: function(playerSalaries) {
		var playerSalaryMap = new HashMap();
		playerSalaries.forEach(function(playerSalary) {
			var key = playerSalary.player.first_name + "|" + playerSalary.player.last_name + "|" + playerSalary.game.start_time + "|" + playerSalary.player.team.abbreviation;
			if (!playerSalaryMap.has(key)) {
				playerSalaryMap.set(
					key,
					{
						draftKingsSalary: null,
						fanDuelSalary: null
					}
				);
			};
			var value = playerSalaryMap.get(key);
			switch(playerSalary.site.name) {
				case "DraftKings":
					value.draftKingsSalary = playerSalary.salary;
					break;
				case "FanDuel":
					value.fanDuelSalary = playerSalary.salary;
					break;
				default:
					return true;
			}
			playerSalaryMap.set(key, value);
		});
		return playerSalaryMap;
	},


	render: function() {
		var playerSalaryList = [];
		if (this.state.playerSalaryList.length > 0) {
			var playerSalaryMap = this.returnPlayerSalaryMap(this.state.playerSalaryList);
			playerSalaryMap.forEach(function(value, key) {
				keyValues = key.split("|");
				var data = 
				{
					"Name": keyValues[0] + " " + keyValues[1],
					"Team": keyValues[3],
					"Game Start Time": keyValues[2],
					"DraftKings Salary": value.draftKingsSalary,
					"FanDuel Salary": value.fanDuelSalary,
					"Difference (DK - FD)": value.draftKingsSalary - value.fanDuelSalary
				};
				playerSalaryList.push(data);
			});		
		}
		var data = {playerSalaryList};
		console.log(playerSalaryList);
		console.log(this.state.playerSalaryList);

		return (
			<Table 
				className="table" 
				data={playerSalaryList} 
				sortable={[
					"Name",
					"Team",
					"Game Start Time",
					"DraftKings Salary",
					"FanDuel Salary",
					"Difference (DK - FD)"
				]}
				filterable={[
					"Name"
				]}
			/>
		);
	}
});

module.exports = PlayerSalaryTable;