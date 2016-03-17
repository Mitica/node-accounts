'use strict';

var User = require('../models/user');
var utils = require('../utils');
var Promise = utils.Promise;

module.exports = function newUsername(appId, storage, profile) {
	profile = profile || {};
	var usernames = [profile.username, profile.displayName, profile.givenName, profile.familyName];
	if (profile.givenName && profile.familyName) {
		usernames.push(profile.givenName + ' ' + profile.familyName);
	}
	usernames = usernames.filter(function(item) {
		return User.isValidUsername(item);
	});
	usernames.push(false);
	usernames.push(false);

	usernames = usernames.filter(function(item) {
		return User.isValidUsername(User.createUsername(item));
	});

	var username;

	// console.log('usernames', usernames);

	return Promise.each(usernames, function(item) {
		if (!username) {
			var key = User.createUsername(item);
			return storage.users.getByUsername(appId, key)
				.then(function(dbUser) {
					if (!dbUser) {
						username = key;
					}
				});
		}
	}).then(function() {
		return username;
	});
};
