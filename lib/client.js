'use strict';

var createApi = require('./api');

module.exports = function createClient(storage, options) {

	var admin = {

	};

	var apps = {

	};

	function api(appId) {
		return createApi(storage, appId, options);
	}

	var client = {
		admin: admin,
		apps: apps,
		app: api,
		api: api
	};

	return client;

};
