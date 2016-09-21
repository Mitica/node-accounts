'use strict';

var storage = require('./dynamo_storage') || require('./storage_mock');
var options = {
	secret: 'iam-sure'
};

var accounts = require('../../lib')(storage, options);

before(function() {
	console.log('sync DB');
	return accounts.admin.sync();
});

after(function() {
	console.log('drop DB');
	return accounts.admin.drop(options.secret);
});
