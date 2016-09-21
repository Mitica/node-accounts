'use strict';

require('dotenv').load({
	silent: true
});

process.env.ACCOUNTS_TABLE_PREFIX = process.env.ACCOUNTS_TABLE_PREFIX || 'test_DA';
