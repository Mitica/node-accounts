'use strict';

try {
	module.exports = require('dynamo-accounts').storage();
} catch (e) {
	console.log('Invalid dynamo-accounts config', e);
	module.exports = false;
}
