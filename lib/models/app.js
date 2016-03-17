'use strict';

var utils = require('../utils');
// var _ = utils._;
var randomString = utils.randomString;
// var md5 = utils.md5;
// var uuid = utils.uuid;

exports.newId = function newId() {
	return randomString(16);
};
