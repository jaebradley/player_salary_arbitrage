var React = require('react');

var PlayerSalaryTableRow = React.createClass({
	render: function() {
		var styles = {
			removeTask: {
				fontSize: 20,
				float: "left",
				position: "absolute",
				top: 12,
				left: 6,
				cursor: "pointer",
				color: "rgb(222, 79, 79)"
			},
			todoTask: {
				paddingLeft: 20,
				fontSize: 17
			}
		};
		return (
			<tr className="list-group-item" >
				<td>{this.props.name}</td>
				<td>{this.props.teamAbbreviation}</td>
				<td>{this.props.gameStartTime}</td>
				<td>{this.props.draftKingsSalary}</td>
				<td>{this.props.fanDuelSalary}</td>
				<td>{this.props.draftKingsSalary - this.props.fanDuelSalary}</td>
				<td>{this.props.fanDuelSalary - this.props.draftKingsSalary}</td>
			</tr>
		);
	}
});

module.exports = PlayerSalaryTableRow;