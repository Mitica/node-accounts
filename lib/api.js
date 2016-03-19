'use strict';

var createUsers = require('./users');
var createConnections = require('./connections');
var createLogin = require('./users/login');
var Options = require('./options');

/**
 * Creates a new Api object.
 * @constructs Api
 * @param  {Storage} storage A Storage instance.
 * @param  {ApiOptions} [options] Api options.
 * @return {Api}         An instance of Api.
 */
module.exports = function createApi(storage, appId, options) {

	options = Options.app(options);

	var users = createUsers(storage, appId, options);
	var connections = createConnections(storage, appId, options);

	/**
	 * Api object
	 * @lends Api#
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
