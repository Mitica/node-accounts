'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;
var storageBind = require('../storage_bind');

module.exports = function createConnections(storage, appKey, options) {

	var client = {};

	storageBind(client, storage, 'connections', appKey, options);

	return client;
};
