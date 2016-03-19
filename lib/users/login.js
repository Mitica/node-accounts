'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var UserProfile = require('./user_profile');
var connectionHelpers = require('../connections/helpers');
var newUsername = require('./new_username');
var debug = require('debug')('accounts');

module.exports = function createLogin(users, connections, storage, appId) {

	function postProviderLogged(connection) {
		return Promise.all([
			users.update({
				id: connection.userId,
				lastLoginAt: Date.now()
			})
		]).then(function() {
			return connection.userId;
		});
	}

	function providerLogin(profile, options) {

		var connection = UserProfile.toConnection(profile);
		connection.id = connectionHelpers.createId(appId, connection.provider, connection.profileId);

		debug('Provider logining...', profile);

		return connections.getById(connection.id)
			.then(function(dbConnection) {
				if (dbConnection) {
					return postProviderLogged(dbConnection);
				} else {
					return newUsername(users, profile)
						.then(function(username) {
							var user = UserProfile.toUser(profile);
							user.username = username;

							return users.create(user, options)
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

	function login(profile, options) {
		return providerLogin(profile, options);
	}

	return login;
};
