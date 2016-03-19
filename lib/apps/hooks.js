'use strict';

var debug = require('debug')('accounts');
var helpers = require('./helpers');

exports.pre = {
	create: function(data) {
		debug('Creating a new App', data);
		data = helpers.validate(data);

		return data;
	}
};

exports.post = {
	create: function(result) {
		debug('Created App', result);
	}
};
