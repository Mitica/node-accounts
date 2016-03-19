'use strict';

var assert = require('assert');
var storage = require('./common/storage_mock');
var Accounts = require('../lib').client(storage);
var App = Accounts.api('123456cihurehgiuehnrugivenrio');

describe('Login', function() {
	it('should login with provider', function() {
		return App.login({
			id: '21312423',
			provider: 'google',
			username: 'Ion',
			emails: [{ value: 'email@mail.com' }],
			accessData: JSON.stringify({ token: 'secret' })
		}).then(function(userId) {
			assert.ok(userId);
			// return App.users.getById(userId)
			// 	.then(function(user) {
			// 		assert.equal('ion', user.username);
			// 	});
		});
	});
});
