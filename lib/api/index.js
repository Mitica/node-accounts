var Api = require('./api'),
  Db = require('../db'),
  validator = require('../validation'),
  assert = require('assert'),
  slug = require('slug'),
  crypto = require('crypto');

module.exports = function(connection, options) {
  var db = Db(connection, options);
  return {
    sync: function(opts) {
      return db.sequelize.sync(opts);
    },
    drop: function(opts) {
      return db.sequelize.drop(opts);
    },
    createApp: function(data) {
      assert.ok(data);

      validator.assert('apps/create', data);

      data.uname = slug(data.uname || data.name).replace(/\./, '-').toLowerCase();
      var time = (new Date()).getTime().toString();
      console.log('time: '+time);
      data.key = crypto.createHash('md5').update(time).digest('hex');

      return db.App.create(data).then(function(app){
        return app.get();
      });
    },
    api: function(appKey, opts) {
      return db.App.find({
        key: appKey
      }).then(function(data) {
        return Api(db, data.get(), opts);
      });
    }
  };
}
