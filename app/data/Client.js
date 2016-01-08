"use es6";

var $ = require('jquery');
var Q = require('q');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var jsonp = require('superagent-jsonp');

var Client = {
	allResults: [],
	getData: function(url) {
		return new Promise(function (resolve, reject) {
			request
				.get(url)
				.use(jsonp)
				.end(function (err, res) {
					if (res.status === 404) {
						reject();
					} else {
						resolve(res.body);
					}
			});
		});
	},
	getAllData: function(url) {
		return this.getData(url).then(function(results) {
			if (results.next == null) {
				return this.allResults;
			} else {
				for (var i = 0; i < results.results.length; i++) {
					this.allResults.push(results.results[i]);
				}
				return this.getAllData(results.next);
			}
		}.bind(this));
	},
	
};

module.exports = Client;