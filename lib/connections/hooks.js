'use strict';

var debug = require('debug')('accounts');
var helpers = require('./helpers');

exports.pre = {
	create: function(appId, data) {
		debug('Creating a new Connection...', appId);
		data = helpers.validate(data);

		return data;
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
