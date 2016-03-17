'use strict';

var assert = require('assert');

var Accounts = require('../lib').client(require('./common/storage'));

describe('Apps', function() {
	it('should exist `create` method', function() {
		assert.equal('function', typeof Accounts.apps.create);
	});
	it('should exist `getById` method', function() {
		assert.equal('function', typeof Accounts.apps.getById);
	});
});
