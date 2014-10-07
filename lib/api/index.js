var Api = require('./api'),
  Db = require('../db'),
  validator = require('../validation'),
  assert = require('assert'),
  slug = require('slug'),
  crypto = require('crypto');

module.exports = function(connection, options) {
  var db = Db(connection, options);
  var apps = require('./apps')(db, options);

  return {
    sync: function(opts) {
      return db.sequelize.sync(opts);
    },

    drop: function(opts) {
      return db.sequelize.drop(opts);
    },

    apps: apps,

    api: function(appKey, opts) {
      console.log('calling api');
      return apps.byKey(appKey).then(function(app) {
        if (app)
          return Api(db, app, opts);
        throw new Error('App not found!');
      });
    }
  };
}