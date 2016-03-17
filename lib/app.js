'use strict';

var createUsers = require('./users');
var createConnections = require('./connections');
var createLogin = require('./users/login');
var Options = require('./options');

module.exports = function createApp(storage, appId, options) {

	options = Options.app(options);

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
