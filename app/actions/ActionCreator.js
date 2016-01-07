var Dispatcher = require('../core/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var Client = require('../data/Client');

var ActionCreator = {
	getPlayerSalaries: function () {
		Client
			.getData('https://nba-persistence.herokuapp.com/player_salaries/?salary_min=10000')
			.then(function (playerSalaries) {
				Dispatcher.handleViewAction({
					actionType: ActionConstants.GOT_DATA,
					playerSalaries: playerSalaries
				});
			});
	}
};

module.exports = ActionCreator;