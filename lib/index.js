'use strict';

var createClient = require('./client');

function buildClient(name, config, options) {
	var storage;

	if (typeof name === 'string') {
		var storageModule;

		try {
			storageModule = require(name);
		} catch (e) {
			throw new Error('Please install module `' + name + '`');
		}

		storage = storageModule(config);
	} else if (typeof name === 'object') {
		storage = name;
	} else {
		throw new Error('Client name is required!');
	}

	return createClient(storage, options);
}

exports.client = buildClient;

exports.mongo = buildClient.bind(null, 'mongo-accounts');
exports.dynamo = buildClient.bind(null, 'dynamo-accounts');
