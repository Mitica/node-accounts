'use strict';

var assert = require('assert');

var Accounts = require('../lib').client(require('./common/storage'));
var users = Accounts.app('123456').users;

console.log(users);

describe('Login', function() {
	it('should login with provider', function() {
		return users.login({
			id: '21312423',
			provider: 'google',
			username: 'Ion'
		});
	});
});
