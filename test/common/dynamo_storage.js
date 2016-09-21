'use strict';

if (process.env.AWS_ACCESS_KEY_ID) {
	try {
		module.exports = require('dynamo-accounts').storage();
	} catch (e) {
		console.log('Invalid dynamo-accounts config', e);
		module.exports = false;
	}
} else {
	module.exports = false;
}
