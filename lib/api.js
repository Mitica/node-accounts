'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;

var createUsers = require('./users');
var createConnections = require('./connections');
var createLogin = require('./users/login');

module.exports = function createApi(storage, appId, options) {

	var users = createUsers(storage, appId, options);
	var connections = createConnections(storage, appId, options);
	var login = createLogin(users, connections, storage, appId, options);

	users.login = login;

	var client = {
		users: users,
		connections: connections,
		login: login
	};

	return client;
};
