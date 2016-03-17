'use strict';

var assert = require('assert');

var Accounts = require('../lib').client(require('./common/storage_mock'));
var users = Accounts.app('123456').users;

describe('Login', function() {
	it('should login with provider', function() {
		return users.login({
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
