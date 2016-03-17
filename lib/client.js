'use strict';

var createApp = require('./app');
var createAdmin = require('./admin');
var createApps = require('./apps');
var Options = require('./options');

module.exports = function createClient(storage, options) {

	options = Options.client(options);

	function app(appId, appOptions) {
		return createApp(storage, appId, appOptions);
	}

	var client = {
		admin: createAdmin(storage, options),
		apps: createApps(storage, options),
		app: app
	};

	return client;

};
