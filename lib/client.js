'use strict';

var createApi = require('./api');
var createAdmin = require('./admin');
var createApps = require('./apps');

module.exports = function createClient(storage, options) {

	function api(appId) {
		return createApi(storage, appId, options);
	}

	var client = {
		admin: createAdmin(storage, options),
		apps: createApps(storage, options),
		app: api,
		api: api
	};

	return client;

};
