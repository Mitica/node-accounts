'use strict';

var assert = require('assert');

var storage = require('./common/dynamo_storage') || require('./common/storage_mock');

var Accounts = require('../lib')(storage);
var utils = require('../lib/utils');
var appId;

describe('Apps', function() {

	before(function() {
		return storage.admin.sync();
	});

	it('should `create` a new app', function() {
		return Accounts.apps.create({
				name: utils.randomString(32)
			})
			.then(function(app) {
				assert.ok(app);
				appId = app.id;
			});
	});
	it('should `getById`', function() {
		return Accounts.apps.getById(appId)
			.then(function(app) {
				assert.ok(app);
				assert.equal(appId, app.id);
			});
	});
});
