var React = require('react');

var PlayerSalaryTableRow = React.createClass({
	render: function() {
		var styles = {
			tr: {
				border: '1px solid black'
			},
			td: {
				border: '1px solid black'
			}
		};
		var draftKingsDifference = this.props.draftKingsSalary - this.props.fanDuelSalary;
		var fanDuelDifference = this.props.fanDuelSalary - this.props.draftKingsSalary;
		
		return (
			<tr style={styles.tr} >
				<td style={styles.td}>{this.props.name}</td>
				<td>{this.props.teamAbbreviation}</td>
				<td>{this.props.gameStartTime}</td>
				<td>{this.props.draftKingsSalary}</td>
				<td>{this.props.fanDuelSalary}</td>
				<td>{draftKingsDifference}</td>
				<td>{fanDuelDifference}</td>
			</tr>
		);
	}
});

module.exports = PlayerSalaryTableRow;