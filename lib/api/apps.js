var validator = require('../validation'),
assert = require('assert'),
slug = require('slug'),
crypto = require('crypto');

module.exports = function (db, app, options) {
  function get(data) {
    return data.get();
  }

  //apps API
  return {
    // get app by key
    byKey: function(key) {
      return db.Account.find({
        key: key
      }).then(get);
    },
    // get app by key
    byUname: function(uname) {
      return db.Account.find({
        uname: uname
      }).then(get);
    },
    // creates an application
    create: function(data) {
      assert.ok(data);

      validator.assert('apps/create', data);

      data.uname = slug(data.uname || data.name).replace(/\./, '-').toLowerCase();
      data.key = crypto.createHash('md5').update((new Date).getTime()).digest('hex');

      return db.App.create(data).then(get);
    }
  };
}