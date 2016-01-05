"use es6";

var $ = require('jquery');
var Q = require('q');

var Client = {
	getData: function(url) {
		var deferred = Q.defer();
		$.ajax({
		    type: "GET",
		    url: url,
		    dataType: "jsonp",
		    success: function(data) {
	            deferred.resolve(data);
	        }
		});
		return deferred.promise;
	}
};

module.exports = Client;