'use strict';

var utils = require('../../lib/utils');
var Promise = utils.Promise;
var uuid = require('uuid').v4;

exports.admin = {
	sync: function() {
		return Promise.resolve();
	},
	drop: function() {
		return Promise.resolve();
	}
};

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
		data.id = uuid();
		return Promise.resolve(data);
	},
	getByUsername: function(appId, username) {
		return Promise.resolve();
	},
	update: function(appId, data) {
		return Promise.resolve(data);
	}
};
