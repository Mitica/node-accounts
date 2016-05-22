'use strict';

try {
	module.exports = require('mongo-accounts')();
} catch (e) {
	console.log('Invalid mongo-accounts config');
	module.exports = false;
}
