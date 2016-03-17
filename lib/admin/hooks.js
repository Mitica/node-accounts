'use strict';

var debug = require('debug')('accounts');

exports.pre = {
	sync: function() {
		debug('Syncing accounts DB...');
	}
};

exports.post = {
	sync: function() {
		debug('Synced accounts DB');
	}
};
