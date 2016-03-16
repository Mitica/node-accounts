'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;

module.exports = function createLogin(connections, storage, appKey, options) {

	function providerLogin(profile, opts) {

	}

	function login(profile, opts) {
		return providerLogin(profile, opts);
	}

	return login;
};
