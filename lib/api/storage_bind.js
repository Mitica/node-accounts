'use strict';

var utils = require('../../utils');
var Promise = utils.Promise;

function bindMethod(container, method, hooks, appKey, options) {
	return function() {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(appKey);

		// pre hook operation
		var op = hooks.pre[method];
		if (op) {
			try {
				args[1] = op.apply(null, args);
			} catch (e) {
				return Promise.reject(e);
			}
		}
		return container[method].apply(container, args)
			.then(function(result) {
				// post hook operation
				op = hooks.post[method];
				if (op) {
					args.unshift(result);
					try {
						result = op.apply(null, args);
					} catch (e) {
						return Promise.reject(e);
					}
				}
				return result;
			});
	};
}

module.exports = function storageBind(target, container, methods, hooks, appKey, options) {
	methods.forEach(function(method) {
		target[method] = bindMethod(container, method, hooks, appKey, options);
	});
};
