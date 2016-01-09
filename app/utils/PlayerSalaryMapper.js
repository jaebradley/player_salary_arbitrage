var HashMap = require('hashmap');


var PlayerSalaryMapper = {
	mapPlayerSalaries: function(playerSalaries) {
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
	}
}

module.exports = PlayerSalaryMapper;