'use strict';

var assert = require('assert');

var Accounts = require('../lib').client(require('./common/storage'));

describe('Admin', function() {
	it('should exist `sync` method', function() {
		assert.equal('function', typeof Accounts.admin.sync);
	});
	it('should exist `drop` method', function() {
		assert.equal('function', typeof Accounts.admin.drop);
	});
});
