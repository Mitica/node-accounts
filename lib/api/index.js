'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;

var createUsers = require('./users');
var createConnections = require('./connections');

module.exports = function createAccounts(storage, appKey, options) {

	var connections = createConnections(storage, appKey, options);
	var users = createUsers(connections, storage, appKey, options);

	var client = {
		users: users,
		connections: connections
	};

	return client;
};
