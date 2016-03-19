'use strict';

var debug = require('debug')('accounts');
var validator = require('../validator');

exports.pre = {
	create: function(data) {
		debug('Creating a new App', data);

		data = validator.create('app', data);

		return data;
	}
};

exports.post = {
	create: function(result) {
		debug('Created App', result.name);
	}
};
