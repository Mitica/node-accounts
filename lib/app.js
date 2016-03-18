'use strict';

var createUsers = require('./users');
var createConnections = require('./connections');
var createLogin = require('./users/login');
var Options = require('./options');

/**
 * Creates a new App object.
 * @constructs App
 * @param  {Storage} storage A Storage instance.
 * @param  {AppOptions} [options] App options.
 * @return {App}         An instance of App.
 */
module.exports = function createApp(storage, appId, options) {

	options = Options.app(options);

	var users = createUsers(storage, appId, options);
	var connections = createConnections(storage, appId, options);

	/**
	 * App object
	 * @lends App#
	 */
	var client = {
		/**
		 * An Users object
		 * @type {Users}
		 */
		users: users,
		/**
		 * An Connections object
		 * @type {Connections}
		 */
		connections: connections,
		/**
		 * Login an user
		 * @function
		 * @param  {UserProfile} profile - User's Profile
		 * @param  {DataOptions} [options] - Login options
		 * @return {Promise}
		 */
		login: createLogin(users, connections, storage, appId, options)
	};

	return client;
};
