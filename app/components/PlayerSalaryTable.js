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
var Moment = require('moment');
var DatePicker = require('react-datepicker');

var PlayerSalaryTable = React.createClass({
	getInitialState: function() {
		return {
			playerSalaryList: [],
			estDate: Moment.utc().utcOffset('-0500').startOf('day')
		};
	},

	componentWillMount: function () {
	    Store.addChangeListener(this.handleChange);
	},

	componentDidMount: function () {
		var estDateStartUnixTimestamp = this.state.estDate.unix();
		var estDateStartUnixTimestamp = 1451520000;

		ActionCreator.getPlayerSalaries({
			salary_min: 8000,
			unix_start_time: estDateStartUnixTimestamp,
			unix_end_time: estDateStartUnixTimestamp + 86400
		});

		this.setState({
		  playerSalaryList: Store.getPlayerSalaries()
		});
	},

	componentWillUnmount: function () {
		Store.removeChangeListener(this.handleChange);
	},

	handleChange: function (event) {
		// var newEstDate = Moment(event.target.selected).utc().utcOffset('-0500').startOf('day');
		// var estDateStartUnixTimestamp = newEstDate.unix();

		// ActionCreator.getPlayerSalaries({
		// 	salary_min: 8000,
		// 	start_unix_timestamp: estDateStartUnixTimestamp,
		// 	end_unix_timestamp: estDateStartUnixTimestamp + 86400
		// });

		this.setState({
		  playerSalaryList: Store.getPlayerSalaries(),
		  // estDate: newEstDate
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

		return (
			<div>
				<DatePicker
					selected={this.state.estDate}
					onChange={this.handleChange}
				/>
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
			</div>
		);
	}
});

module.exports = PlayerSalaryTable;