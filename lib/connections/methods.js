'use strict';

module.exports = {
	create: { args: 1 },
	update: { args: 1 },
	getById: { args: 1 },
	findByUserId: { args: 1 },
	deleteById: { args: 1 },
	deleteByUserId: { args: 1 }
};

(function() {
	/**
	 * @lends Connections
	 */
	var methods = {
		/**
		 * Creates a new Connection
		 * @param  {ConnectionRecord} data  - User object
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise<ConnectionRecord>}
		 * @instance
		 */
		create: function(data, options) {},
		/**
		 * Update a Connection fields
		 * @param  {ConnectionRecord} data  - Connection object
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise<ConnectionRecord>}
		 * @instance
		 */
		update: function(data, options) {},
		/**
		 * Get a Connection by id
		 * @param  {String} id  - Connection id
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise<ConnectionRecord>}
		 * @instance
		 */
		getById: function(id, options) {},
		/**
		 * Find Connections by user id
		 * @param  {String} userId  - User id
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise<ConnectionRecord[]>}
		 * @instance
		 */
		findByUserId: function(userId, options) {},
		/**
		 * Delete an Connection by id
		 * @param  {String} id  - Connection id
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise<Number>}
		 * @instance
		 */
		deleteById: function(id, options) {},
		/**
		 * Delete an Connections by user id
		 * @param  {String} userId  - User id
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise<Number>}
		 * @instance
		 */
		deleteByUserId: function(userId, options) {}
	}
});
