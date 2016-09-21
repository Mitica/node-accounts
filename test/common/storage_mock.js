'use strict';

var utils = require('../../lib/utils');
var Promise = utils.Promise;

exports.admin = {
	sync: function() {
		return Promise.resolve();
	},
	drop: function() {
		return Promise.resolve();
	}
};

exports.apps = {
	create: function(data) {
		return Promise.resolve(data);
	},
	getById: function(id) {
		return Promise.resolve({ id: id });
	}
};

exports.identities = {
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
		return Promise.resolve(data);
	},
	update: function(appId, data) {
		return Promise.resolve(data);
	}
};
