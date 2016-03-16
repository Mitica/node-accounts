'use strict';

var createClient = require('./client');

function buildClient(name, config, options) {
	if (typeof name !== 'string') {
		throw new Error('Client name is required!');
	}

	var moduleName = [name, 'accounts'].join('-');
	var storageModule;
	var storage;

	try {
		storageModule = require(moduleName);
	} catch (e) {
		throw new Error('Please install module `' + moduleName + '`');
	}

	storage = storageModule(config);

	return createClient(storage, options);
}

exports.client = buildClient;

exports.mongo = buildClient.bind(null, 'mongo');
exports.dynamo = buildClient.bind(null, 'dynamo');
