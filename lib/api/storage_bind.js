'use strict';

var METHODS = {
	users: ['getById', 'getByUsername', 'getByKey', 'update', 'deleteById'],
	connections: ['getById', 'findByUserId', 'deleteById', 'deleteByUserId']
};

function bindMethod(storage, container, method, appKey, options) {
	var self = storage[container];
	return self[method].bind(self, appKey);
}

module.exports = function storageBind(target, storage, container, appKey, options) {
	var methods = METHODS[container];

	methods.forEach(function(method) {
		target[method] = bindMethod(storage, container, method, appKey, options);
	});
};
