var React = require('react');
var Reactable = require('reactable');
var Td = Reactable.Td;
var Tr = Reactable.Tr;

var PlayerSalaryTableRow = React.createClass({
	render: function() {
		var draftKingsDifference = this.props.draftKingsSalary - this.props.fanDuelSalary;
		
		return (
			<Tr>
				<Td column="name">{this.props.name}</Td>
				<Td column="team">{this.props.teamAbbreviation}</Td>
				<Td column="startTime">{this.props.gameStartTime}</Td>
				<Td column="draftKingsSalary">{this.props.draftKingsSalary}</Td>
				<Td column="fanDuelSalary">{this.props.fanDuelSalary}</Td>
				<Td column="difference">{draftKingsDifference}</Td>
			</Tr>
		);
	}
});

module.exports = PlayerSalaryTableRow;