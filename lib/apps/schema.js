'use strict';

var Joi = require('joi');

/**
 * App object
 * @class App
 */
module.exports = Joi.object().keys({
	/**
	 * Application id.
	 * A hex string. Min 16, max 32 chars.
	 * @memberof App#
	 * @type {String}
	 */
	id: Joi.string().hex().min(16).max(32).required(),
	/**
	 * Application name. Min 3, max 64 chars.
	 * @memberof App#
	 * @type {String}
	 */
	name: Joi.string().trim().min(3).max(64).required(),
	/**
	 * Created date. Unix time in milliseconds.
	 * @memberof App#
	 * @type {Number}
	 */
	createdAt: Joi.number().integer().min(0).required(),
	/**
	 * Updated date. Unix time in milliseconds.
	 * @memberof App#
	 * @type {Number}
	 */
	updatedAt: Joi.number().integer().min(0),
	/**
	 * Application custom data. Max 1000 chars.
	 * @memberof App#
	 * @type {String}
	 */
	customData: Joi.string().trim().max(1000)
});
