'use strict';

var User = require('./user');
var utils = require('../utils');
var Promise = utils.Promise;

module.exports = function newUsername(users, profile) {
	profile = profile || {};
	var usernames = [profile.username, profile.displayName, profile.givenName, profile.familyName];
	if (profile.givenName && profile.familyName) {
		usernames.push(profile.givenName + ' ' + profile.familyName);
	}
	usernames = usernames.filter(function(item) {
		return User.isValidUsername(item);
	}).map(User.createUsername);

	usernames.push(User.createUsername());
	usernames.push(User.createUsername());

	usernames = usernames.filter(function(item) {
		return User.isValidUsername(item);
	});

	var username;

	return Promise.each(usernames, function(item) {
		if (!username) {
			return users.getByUsername(item)
				.then(function(dbUser) {
					if (!dbUser) {
						username = item;
					}
				});
		}
	}).then(function() {
		return username;
	});
};
