'use strict';

try {
	module.exports = require('mongo-accounts')(process.env.MONGO_ACCOUNTS_CONNECTION);
} catch (e) {
	console.log('Invalid mongo-accounts config');
	module.exports = false;
}
