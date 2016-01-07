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
	},

	componentWillUnmount: function () {
		Store.removeChangeListener(this._onChange);
	},

	_onChange: function () {
		this.setState({
		  playerSalaryList: Store.getPlayerSalaries()
		});
	},


	render: function() {
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