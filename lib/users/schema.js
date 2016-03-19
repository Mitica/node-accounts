'use strict';

var Joi = require('joi');

/**
 * User class
 * @class User
 */
module.exports = Joi.object().keys({
	/**
	 * User id.
	 * @memberof User#
	 * @type {String}
	 */
	id: Joi.string().guid().required(),
	/**
	 * Application id.
	 * @memberof User#
	 * @type {String}
	 */
	appId: Joi.string().hex().min(16).max(32).required(),
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
	status: Joi.string().trim().max(50).default('active').required(),
	/**
	 * User role. Default: `user`.
	 * @memberof User#
	 * @type {String}
	 */
	role: Joi.string().trim().max(50).default('user').required(),
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
	createdAt: Joi.number().integer().min(0).required(),
	/**
	 * Updated date. Unix time in milliseconds.
	 * @memberof User#
	 * @type {Number}
	 */
	updatedAt: Joi.number().integer().min(0),
	/**
	 * User custom data. Max 1000 chars.
	 * @memberof User#
	 * @type {String}
	 */
	customData: Joi.string().trim().max(1000)
});
