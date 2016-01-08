var Dispatcher = require('../core/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var Client = require('../data/Client');

var ActionCreator = {
	getPlayerSalaries: function (data) {
		var url = this.appendDataToUrl('https://nba-persistence.herokuapp.com/player_salaries/', data);
		console.log(url);
		Client
			.getAllData(url)
			.then(function (playerSalaries) {
				Dispatcher.handleViewAction({
					actionType: ActionConstants.GOT_DATA,
					playerSalaries: playerSalaries
				});
			});
	},
	appendDataToUrl: function(url, data) {
		var paramterizedUrl = url + "?";
		for (var key in data) {
			paramterizedUrl = paramterizedUrl + key + "=" + data[key] + "&";
		}
		return paramterizedUrl;
	}
};

module.exports = ActionCreator;