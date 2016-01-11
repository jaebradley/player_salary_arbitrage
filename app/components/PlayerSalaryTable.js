"use es6";

var React = require('react');
var PlayerSalaryTableRow = require('./PlayerSalaryTableRow');
var Store = require('../stores/Store');
var ActionCreator = require('../actions/ActionCreator');
var Reactable = require('reactable');
var Table = Reactable.Table;
var Thead = Reactable.Thead;
var Th = Reactable.Th;
var Td = Reactable.Td;
var PlayerSalaryMapper = require('../utils/PlayerSalaryMapper');

var PlayerSalaryTable = React.createClass({
	getInitialState: function() {
		return {
			playerSalaryList: []
		};
	},

	componentWillMount: function () {
	    Store.addChangeListener(this.handleChange);
	},

	componentDidMount: function () {
		var timestamp = this.props.estDate.unix();

		ActionCreator.getPlayerSalaries({
			unix_start_time: timestamp,
			unix_end_time: timestamp + 86400
		});

		this.setState({
		  playerSalaryList: Store.getPlayerSalaries()
		});
	},

	componentWillUnmount: function () {
		Store.removeChangeListener(this.handleChange);
	},

	componentWillReceiveProps: function(nextProps) {
		var timestamp = nextProps.estDate.unix();

	    ActionCreator.getPlayerSalaries({
			unix_start_time: timestamp,
			unix_end_time: timestamp + 86400
		});

		this.setState({
		  playerSalaryList: Store.getPlayerSalaries(),
		});
	},

	handleChange: function () {
		this.setState({
		  playerSalaryList: Store.getPlayerSalaries(),
		});
	},


	render: function() {
		var playerSalaryList = [];
		if (this.state.playerSalaryList.length > 0) {
			var playerSalaryMap = PlayerSalaryMapper.mapPlayerSalaries(this.state.playerSalaryList);
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
					itemsPerPage={20} pageButtonLimit={5}
					defaultSort={
						{
							"column": "Difference (DK - FD)",
							"direction": "desc"
						}
					}
				/>
			</div>
		);
	}
});

module.exports = PlayerSalaryTable;