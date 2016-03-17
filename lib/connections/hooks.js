'use strict';

var debug = require('debug')('accounts');

exports.pre = {
	create: function(appId, data) {
		debug('Creating a new Connection', appId, data);

		return data;
	}
};

exports.post = {
	create: function(result, appId, data) {
		debug('Created a new Connection', result);

		return result;
	}
};
