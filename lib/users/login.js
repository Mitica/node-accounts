'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var UserProfile = require('../models/user_profile');
var Connection = require('../models/connection');
// var hooks = require('./hooks');
var newUsername = require('./new_username');
var debug = require('debug')('accounts');

module.exports = function createLogin(users, connections, storage, appId, options) {

	function postProviderLogged(connection, user) {
		return Promise.all([
			users.update({
				id: connection.userId,
				lastLoginAt: Date.now()
			}),
			connections.update({
				id: connection.id,
				lastLoginAt: Date.now()
			})
		]).then(function() {
			if (user) {
				return user;
			}
			return users.getById(connection.userId);
		});
	}

	function providerLogin(profile, opts) {

		var connection = UserProfile.toConnection(profile);
		connection.id = Connection.createId(appId, connection.provider, connection.providerId);

		debug('Provider logining', profile);

		return connections.getById(connection.id)
			.then(function(dbConnection) {
				if (dbConnection) {
					return postProviderLogged(dbConnection);
				} else {
					return newUsername(appId, storage, profile)
						.then(function(username) {
							var user = UserProfile.toUser(profile);
							user.username = username;

							return users.create(user, opts)
								.then(function(dbUser) {
									connection.userId = dbUser.id;

									return connections.create(connection)
										.then(function(dbConnection2) {
											return postProviderLogged(dbConnection2, dbUser);
										});
								});
						});
				}
			});
	}

	function login(profile, opts) {
		return providerLogin(profile, opts);
	}

	return login;
};
