'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;

var createUsers = require('./users');
var createConnections = require('./connections');

module.exports = function createApi(storage, appId, options) {

	var connections = createConnections(storage, appId, options);
	var users = createUsers(connections, storage, appId, options);

	var client = {
		users: users,
		connections: connections
	};

	return client;
};
