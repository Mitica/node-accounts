'use strict';

var utils = require('../utils');
var _ = utils._;

exports.toUser = function convertToUser(profile) {
	var data = _.pick(profile, ['displayName', 'username', 'gender']);

	if (profile.name) {
		data.familyName = profile.name.familyName;
		data.givenName = profile.name.givenName;
		data.middleName = profile.name.middleName;
	}

	if (profile.emails && profile.emails.length > 0) {
		data.email = profile.emails[0].value;
	}
	if (profile.photos && profile.photos.length > 0) {
		data.photo = profile.photos[0].value;
	}

	return data;
};

exports.toConnection = function convertToConnection(profile) {
	var data = _.pick(profile, ['profileUrl', 'displayName', 'username', 'gender', 'accessData']);

	if (profile.name) {
		data.familyName = profile.name.familyName;
		data.givenName = profile.name.givenName;
		data.middleName = profile.name.middleName;
	}

	data.provider = profile.provider;
	data.profileId = profile.id;

	if (profile.emails && profile.emails.length > 0) {
		data.email = profile.emails[0].value;
	}
	if (profile.photos && profile.photos.length > 0) {
		data.photo = profile.photos[0].value;
	}

	return data;
};
