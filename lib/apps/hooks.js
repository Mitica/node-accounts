'use strict';

var debug = require('debug')('accounts');

exports.pre = {
	create: function(data) {
		debug('Creating a new App', data);
	}
};

exports.post = {
	create: function(result) {
		debug('Created App', result);
	}
};
