'use strict';

var debug = require('debug')('accounts');
var validator = require('../validator');

exports.pre = {
	create: function(appId, data) {
		debug('Creating a new Connection...', appId);

		data = validator.create('connection', data);

		return data;
	},
	update: function(appId, data) {
		debug('Updating a Connection...', data);
	}
};

exports.post = {
	create: function(result) {
		debug('Created a new Connection', result.id);
	},
	update: function(result) {
		debug('Updated a Connection', result.id);
	}
};
