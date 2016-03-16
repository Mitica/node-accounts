'use strict';

var utils = require('../utils');
// var _ = utils._;
// var randomString = utils.randomString;
var md5 = utils.md5;
// var uuid = utils.uuid;

exports.createId = function createId(appId, provider, providerId) {
	return md5([appId.trim(), provider.trim().toLowerCase(), providerId.trim()].join('|'));
};
