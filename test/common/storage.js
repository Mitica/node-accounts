'use strict';

var utils = require('../../lib/utils');
var Promise = utils.Promise;

exports.connections = {
	getById: function(appId, id) {
		return Promise.resolve();
	},
	create: function(appId, data) {
		return Promise.resolve(data);
	},
	update: function(appId, data) {
		return Promise.resolve(data);
	}
};

exports.users = {
	getById: function(appId, id) {
		return Promise.resolve();
	},
	create: function(appId, data) {
		data.id = 'eqew';
		return Promise.resolve(data);
	},
	getByUsername: function(appId, username) {
		return Promise.resolve();
	},
	update: function(appId, data) {
		return Promise.resolve(data);
	}
};
