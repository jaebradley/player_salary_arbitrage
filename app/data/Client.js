"use es6";

var $ = require('jquery');
var Q = require('q');
var request = require('superagent');
var Promise = require('es6-promise').Promise;
var jsonp = require('superagent-jsonp');

var Client = {
	getData: function(url) {
		return new Promise(function (resolve, reject) {
			request
				.get(url)
				.use(jsonp)
				.end(function (err, res) {
					if (res.status === 404) {
						reject();
					} else {
						resolve(res.body.results);
					}
			});
		});
	}
};

module.exports = Client;