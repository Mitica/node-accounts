'use strict';

var utils = require('../utils');
// var _ = utils._;
var randomString = utils.randomString;
// var md5 = utils.md5;
// var uuid = utils.uuid;
var appSchema = require('./schema');

exports.newId = function newId() {
	return randomString({
		length: 16,
		charset: 'hex'
	}).toLowerCase();
};

exports.validate = function validateUser(data) {
	console.log('appSchema', appSchema);
	return data;
};
