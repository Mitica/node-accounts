'use strict';

var storageBind = require('../storage_bind');
var hooks = require('./hooks');
var methods = require('./methods');

/**
 * Creates a new Connections object.
 * @constructs Connections
 * @param  {Storage} storage - A Storage instance.
 * @param  {String} appId - An applicatin id
 * @param  {AppOptions} [options] App options.
 * @return {Connections}
 */
module.exports = function createConnections(storage, appId, options) {

	/**
	 * Connections object
	 * @lends Connections
	 */
	var client = {};

	storageBind(client, storage.connections, methods, hooks, options, appId);

	return client;
};
