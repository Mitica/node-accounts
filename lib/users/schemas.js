'use strict';

var Joi = require('joi');
var helpers = require('./helpers');

/**
 * User class
 * @class User
 */
exports.create = {
	/**
	 * User id.
	 * @memberof User#
	 * @type {String}
	 */
	id: Joi.string().guid().default(helpers.newId, 'new user id'),
	// *
	//  * Application id.
	//  * @memberof User#
	//  * @type {String}
	// appId: Joi.string().alphanum().lowercase().min(16).max(32).required(),
	/**
	 * User email.
	 * @memberof User#
	 * @type {String}
	 */
	email: Joi.string().trim().lowercase().email().required(),
	/**
	 * User username.
	 * @memberof User#
	 * @type {String}
	 */
	username: Joi.string().trim().min(3).max(50).required(),
	/**
	 * User display name.
	 * @memberof User#
	 * @type {String}
	 */
	displayName: Joi.string().trim().min(3).max(100),
	/**
	 * User family name.
	 * @memberof User#
	 * @type {String}
	 */
	familyName: Joi.string().trim().max(50),
	/**
	 * User given name.
	 * @memberof User#
	 * @type {String}
	 */
	givenName: Joi.string().trim().max(50),
	/**
	 * User middle name.
	 * @memberof User#
	 * @type {String}
	 */
	middleName: Joi.string().trim().max(50),
	/**
	 * User gender: `male` or `female`.
	 * @memberof User#
	 * @type {String}
	 */
	gender: Joi.valid('male', 'female'),
	/**
	 * User status. Default: `active`.
	 * @memberof User#
	 * @type {String}
	 */
	status: Joi.string().trim().max(50).default('active'),
	/**
	 * User role. Default: `user`.
	 * @memberof User#
	 * @type {String}
	 */
	role: Joi.string().trim().max(50).default('user'),
	/**
	 * User photo. Max 255 chars.
	 * @memberof User#
	 * @type {String}
	 */
	photo: Joi.string().trim().max(255),
	/**
	 * Created date. Unix time in milliseconds.
	 * @memberof User#
	 * @type {Number}
	 */
	createdAt: Joi.number().integer().min(0).default(Date.now, 'time of creation'),
	/**
	 * Updated date. Unix time in milliseconds.
	 * @memberof User#
	 * @type {Number}
	 */
	updatedAt: Joi.number().integer().min(0),
	/**
	 * Last login date. Unix time in milliseconds.
	 * @memberof User#
	 * @type {Number}
	 */
	lastLoginAt: Joi.number().integer().min(0),
	/**
	 * User custom data. Max 1000 chars.
	 * @memberof User#
	 * @type {String}
	 */
	customData: Joi.string().trim().max(1000)
};

exports.update = {
	id: Joi.string().guid().required(),
	email: Joi.string().trim().lowercase().email().not(null),
	username: Joi.string().trim().min(3).max(50).not(null),
	displayName: Joi.string().trim().min(3).max(100).not(null),
	familyName: Joi.string().trim().max(50),
	givenName: Joi.string().trim().max(50),
	middleName: Joi.string().trim().max(50),
	gender: Joi.valid('male', 'female'),
	status: Joi.string().trim().max(50).not(null),
	role: Joi.string().trim().max(50).not(null),
	photo: Joi.string().trim().max(255),
	updatedAt: Joi.number().integer().min(0).default(Date.now, 'time of updating'),
	lastLoginAt: Joi.number().integer().min(0).not(null),
	customData: Joi.string().trim().max(1000)
};
