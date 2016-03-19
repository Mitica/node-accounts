'use strict';

var assert = require('assert');
var storage = require('./common/storage_mock');
var Accounts = require('../lib').client(storage);
var App = Accounts.api('123456');

describe('Login', function() {
	it('should login with provider', function() {
		return App.login({
			id: '21312423',
			provider: 'google',
			username: 'Ion'
		}).then(function(user) {
			assert.ok(user);
			// assert.equal('21312423', user.id);
			assert.equal('ion', user.username);
		});
	});
});
