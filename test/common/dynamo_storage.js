'use strict';

try {
	module.exports = require('dynamo-accounts')();
} catch (e) {
	console.log('Invalid dynamo-accounts config');
	module.exports = false;
}
