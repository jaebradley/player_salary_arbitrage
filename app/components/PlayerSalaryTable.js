"use es6";

var React = require('react');
var PlayerSalaryTableRow = require('./PlayerSalaryTableRow');
var Store = require('../stores/Store');
var ActionCreator = require('../actions/ActionCreator');

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

	returnPlayerSalaryTableRow: function(playerSalary) {
		return (
			<PlayerSalaryTableRow 
				name={playerSalary.player.first_name} 
				teamAbbreviation={playerSalary.team.abbrevation} 
				gameStartTime={playerSalary.game.start_time} 
				draftKingsSalary={playerSalary.salary} 
				fanDuelSalary={0} 
			/>
		);
	},


	render: function() {
		var playerSalaryList = [];
		if (this.state.playerSalaryList.length > 0) {
			this.state.playerSalaryList.forEach(function(playerSalary) {
				console.log(playerSalary);
				playerSalaryList.push(
					<PlayerSalaryTableRow 
						name={playerSalary.player.first_name} 
						teamAbbreviation={playerSalary.player.team.abbreviation} 
						gameStartTime={playerSalary.game.start_time} 
						draftKingsSalary={playerSalary.salary} 
						fanDuelSalary={0} 
					/>
				);
			}.bind(this));
		}
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