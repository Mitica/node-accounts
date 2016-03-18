'use strict';

module.exports = {
	create: { args: 1 },
	update: { args: 1 },
	getById: { args: 1 },
	getByUsername: { args: 1 },
	getByKey: { args: 1 },
	deleteById: { args: 1 }
};

/**
 * @typedef Users
 * @mixin
 * @property {createF} create
 */
