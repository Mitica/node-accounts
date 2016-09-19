'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var UserProfile = require('./user_profile');
var identityHelpers = require('../identities/helpers');
var debug = require('debug')('accounts');

module.exports = function createLogin(users, identities, storage, appId) {

	function postSocialLogged(identity) {
		return Promise.all([
			users.update({
				id: identity.userId,
				lastLoginAt: Date.now()
			})
		]).then(function() {
			return identity.userId;
		});
	}

	function socialLogin(profile, options) {

		var identity = UserProfile.toIdentity(profile);

		debug('Provider logining...', profile);

		return identities.getById(identity.id)
			.then(function(dbIdentity) {
				if (dbIdentity) {
					return postSocialLogged(dbIdentity);
				} else {
					// create a new user
					return users.create(identity.profile)
						.then(function(dbUser) {
							identity.userId = dbUser.id;

							return identities.create(identity)
								.then(function(dbIdentity2) {
									return postSocialLogged(dbIdentity2);
								});
						});
				}
			});
	}

	function login(type, data, options) {
		switch (type) {
			case 'social':
				return socialLogin(data, options);
		}

		return Promise.reject(new Error('Login `type` is invalid'));
	}

	return login;
};
