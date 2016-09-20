'use strict';

var assert = require('assert');
var storage = require('./common/dynamo_storage') || require('./common/storage_mock');
var options = {
	secret: 'iam-sure'
};

var Accounts = require('../lib')(storage, options);

describe('Admin', function() {
	it('should exist `sync` method', function() {
		assert.equal('function', typeof Accounts.admin.sync);
	});
	it('should exist `drop` method', function() {
		assert.equal('function', typeof Accounts.admin.drop);
	});
	it('should fail drop()', function() {
		return Accounts.admin.drop()
			.then(function() {
				throw new Error('admin.drop() must fail!');
			})
			.catch(function(error) {
				assert.ok(error);
			});
	});
	it('should fail drop("wrong secret")', function() {
		return Accounts.admin.drop('secret')
			.then(function() {
				throw new Error('admin.drop("secret") must fail!');
			})
			.catch(function(error) {
				assert.ok(error);
			});
	});
	it('should sync accounts DB', function() {
		return Accounts.admin.sync();
	});
	it('should drop accounts DB', function() {
		return Accounts.admin.drop('iam-sure', options).delay(10000);
	});
});
