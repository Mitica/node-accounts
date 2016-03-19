'use strict';

var helpers = require('./helpers');
var utils = require('../utils');
var Promise = utils.Promise;

module.exports = function newhelpersname(users, profile) {
	profile = profile || {};
	var usernames = [profile.username, profile.displayName, profile.givenName, profile.familyName];
	if (profile.givenName && profile.familyName) {
		usernames.push(profile.givenName + ' ' + profile.familyName);
	}
	usernames = usernames.filter(function(item) {
		return helpers.isValidUsername(item);
	}).map(helpers.createUsername);

	usernames.push(helpers.createUsername());
	usernames.push(helpers.createUsername());

	usernames = usernames.filter(function(item) {
		return helpers.isValidUsername(item);
	});

	var username;

	return Promise.each(usernames, function(item) {
		if (!username) {
			return users.getByUsername(item)
				.then(function(dbhelpers) {
					if (!dbhelpers) {
						username = item;
					}
				});
		}
	}).then(function() {
		return username;
	});
};
