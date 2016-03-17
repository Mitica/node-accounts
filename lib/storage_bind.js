'use strict';

var utils = require('./utils');
var Promise = utils.Promise;

function bindMethod(storageContainer, method, hooks, options, appId) {

	function preHook(args) {
		var op = hooks.pre[method];
		if (op) {
			return Promise.resolve(op.apply(null, args))
				.then(function(result) {
					// update `data` param
					if (typeof result !== 'undefined') {
						args[appId ? 1 : 0] = result;
					}
				});
		}
		return Promise.resolve();
	}

	function postHook(args, result) {
		var op = hooks.post[method];
		if (op) {
			args.unshift(result);
			return Promise.resolve(op.apply(null, args))
				.then(function(postResult) {
					if (typeof postResult !== 'undefined') {
						return postResult;
					}
					return result;
				});
		}

		return result;
	}

	function methodBind() {
		// validating storage method
		if (!storageContainer[method]) {
			return Promise.reject(new Error('Method `' + method + '` not found on client'));
		}

		var args = Array.prototype.slice.call(arguments);
		if (appId) {
			args.unshift(appId);
		}

		return preHook(args)
			.then(function() {
				return storageContainer[method].apply(storageContainer, args)
					.then(function(result) {
						return postHook(args, result);
					});
			});
	}

	return methodBind;
}

module.exports = function storageBind(target, storageContainer, methods, hooks, options, appId) {
	methods.forEach(function(method) {
		target[method] = bindMethod(storageContainer, method, hooks, options, appId);
	});
};
