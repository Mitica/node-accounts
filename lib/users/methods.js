'use strict';

module.exports = {
	create: { args: 1 },
	update: { args: 1 },
	getById: { args: 1 },
	getByUsername: { args: 1 },
	getByKey: { args: 1 },
	deleteById: { args: 1 }
};

(function() {
	/**
	 * @lends Users
	 */
	var methods = {
		/**
		 * Creates a new User
		 * @param  {UserRecord} data  - User object
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise}
		 * @instance
		 */
		create: function(data, options) {},
		/**
		 * Update an User fields
		 * @param  {UserRecord} data  - User object
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise}
		 * @instance
		 */
		update: function(data, options) {},
		/**
		 * Get an User by id
		 * @param  {String} id  - User id
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise}
		 * @instance
		 */
		getById: function(id, options) {},
		/**
		 * Get an User by username
		 * @param  {String} username  - User username
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise}
		 * @instance
		 */
		getByUsername: function(username, options) {},
		/**
		 * Delete an User by id
		 * @param  {String} id  - User id
		 * @param  {DataOptions} [options] - Data options
		 * @return {Promise}
		 * @instance
		 */
		deleteById: function(id, options) {}
	}
});
