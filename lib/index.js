'use strict';

var createClient = require('./client');

function buildClient(storage, options) {

	if (typeof storage !== 'object') {
		throw new Error('`storage` param is invalid');
	}

	return createClient(storage, options);
}

exports.client = buildClient;
exports.create = buildClient;
