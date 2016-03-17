'use strict';

var debug = require('debug')('accounts');

exports.pre = {
	create: function(appId, data) {
		debug('Creating a new user', appId, data);

		return data;
	},
	update: function(appId, data) {
		debug('Updating a User...', data);
	}
};

exports.post = {
	create: function(result) {
		debug('Created user', result);

		return result;
	},
	update: function(result) {
		debug('Updated a User...', result);
	}
};
