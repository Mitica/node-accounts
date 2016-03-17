'use strict';

var debug = require('debug')('accounts');

exports.pre = {
	create: function(appId) {
		debug('Creating a new Connection...', appId);
	},
	update: function(appId, data) {
		debug('Updating a Connection...', data);
	}
};

exports.post = {
	create: function(result) {
		debug('Created a new Connection', result);
	},
	update: function(result) {
		debug('Updated a Connection', result);
	}
};
