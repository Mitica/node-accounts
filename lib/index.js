'use strict';

var createClient = require('./client');

function buildClient(name, config, options) {
	if (typeof name !== 'string') {
		throw new Error('Client name is required!');
	}

	var storageModule;
	var storage;

	try {
		storageModule = require(name);
	} catch (e) {
		throw new Error('Please install module `' + name + '`');
	}

	storage = storageModule(config);

	return createClient(storage, options);
}

exports.client = buildClient;

exports.mongo = buildClient.bind(null, 'mongo-accounts');
exports.dynamo = buildClient.bind(null, 'dynamo-accounts');
