var Api = require('./api'),
  Db = require('../db');

module.exports = function(connection, options) {
  var db = Db(connection, options);
  return {
    sync: function(opts) {
      return db.sync(opts);
    },
    drop: function(opts) {
      return db.drop(opts);
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
