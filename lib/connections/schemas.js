'use strict';

var Joi = require('joi');

/**
 * Connection class
 * @class Connection
 */
exports.create = {
	/**
	 * Connection id.
	 * A hex string. Min 32, max 40 chars.
	 * @memberof Connection#
	 * @type {String}
	 */
	id: Joi.string().hex().min(32).max(40).required(),
	/**
	 * User id.
	 * @memberof Connection#
	 * @type {String}
	 */
	userId: Joi.string().guid().required(),
	// /**
	// * Application id.
	// * @memberof Connection#
	// * @type {String}
	// */
	// appId: Joi.string().alphanum().lowercase().min(16).max(32).required(),
	/**
	 * Provider name. Min 2, max 20 chars.
	 * @memberof Connection#
	 * @type {String}
	 */
	provider: Joi.string().trim().min(2).max(20).lowercase().required(),
	/**
	 * Profile id. Min 2, max 255 chars.
	 * @memberof Connection#
	 * @type {String}
	 */
	profileId: Joi.string().trim().min(2).max(255).required(),
	/**
	 * User email.
	 * @memberof Connection#
	 * @type {String}
	 */
	email: Joi.string().trim().lowercase().email().required(),
	/**
	 * User username.
	 * @memberof Connection#
	 * @type {String}
	 */
	username: Joi.string().trim().min(3).max(50).required(),
	/**
	 * User display name.
	 * @memberof Connection#
	 * @type {String}
	 */
	displayName: Joi.string().trim().min(3).max(100),
	/**
	 * User family name.
	 * @memberof Connection#
	 * @type {String}
	 */
	familyName: Joi.string().trim().max(50),
	/**
	 * User given name.
	 * @memberof Connection#
	 * @type {String}
	 */
	givenName: Joi.string().trim().max(50),
	/**
	 * User middle name.
	 * @memberof Connection#
	 * @type {String}
	 */
	middleName: Joi.string().trim().max(50),
	/**
	 * User gender: `male` or `female`.
	 * @memberof Connection#
	 * @type {String}
	 */
	gender: Joi.valid('male', 'female'),
	/**
	 * User photo.
	 * @memberof Connection#
	 * @type {String}
	 */
	photo: Joi.string().trim().max(255),
	/**
	 * User profile url.
	 * @memberof Connection#
	 * @type {String}
	 */
	profileUrl: Joi.string().trim().max(255),
	/**
	 * User access data. accessToken:refreshToken, or token:tokenSecret, or identifier, or... IN JSON format
	 * @memberof Connection#
	 * @type {String}
	 */
	accessData: Joi.string().trim().max(800).required(),
	/**
	 * Created date. Unix time in milliseconds.
	 * @memberof Connection#
	 * @type {Number}
	 */
	createdAt: Joi.number().integer().min(0).default(Date.now, 'time of creation'),
	/**
	 * Updated date. Unix time in milliseconds.
	 * @memberof Connection#
	 * @type {Number}
	 */
	updatedAt: Joi.number().integer().min(0),
	/**
	 * Connection custom data. Max 1000 chars.
	 * @memberof Connection#
	 * @type {String}
	 */
	customData: Joi.string().trim().max(1000)
};

exports.update = {
	id: Joi.string().hex().min(32).max(40).required(),
	email: Joi.string().trim().lowercase().email().not(null),
	username: Joi.string().trim().min(3).max(50).not(null),
	displayName: Joi.string().trim().min(3).max(100),
	familyName: Joi.string().trim().max(50),
	givenName: Joi.string().trim().max(50),
	middleName: Joi.string().trim().max(50),
	gender: Joi.valid('male', 'female'),
	photo: Joi.string().trim().max(255),
	profileUrl: Joi.string().trim().max(255),
	accessData: Joi.string().trim().max(800).not(null),
	updatedAt: Joi.number().integer().min(0).default(Date.now, 'time of updating').not(null),
	customData: Joi.string().trim().max(1000)
};
