"use es6";

var Client = require('./Client');

var PlayerSalaryTableData = {
	data: [],
	fetch: function(url) {
		Client.getData(url).then(function(data) {

			var deferred = Q.defer();
			for (var i = 0; i < data.results.length; i++) {
				this.data.push(data.results[i]);
			}
			return deferred.promise;
		});
	}
};

module.exports = PlayerSalaryTableData;