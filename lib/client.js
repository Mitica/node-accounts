'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;

var createApi = require('./api');

module.exports = function createClient(storage, options) {

	var admin = {

	};

	var apps = {

	};

	function api(appKey) {
		return createApi(storage, appKey, options);
	}

	var client = {
		admin: admin,
		apps: apps,
		api: api
	};

	return client;

};
