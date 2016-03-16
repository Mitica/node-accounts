'use strict';

module.exports = function storageBind(self, method, appKey, options) {
	return self[method].bind(self, appKey);
};
