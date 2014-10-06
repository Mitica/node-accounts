var validator = require('../validation'),
  assert = require('assert'),
  slug = require('slug'),
  crypto = require('crypto');

function get(data) {
  if (data && data.get)
    return data.get();
  return null;
}

module.exports = function(db, app, options) {

  //accounts API
  return {
    // get account by key
    byId: function(id) {
      return db.Account.find({
        id: id,
        appId: app.id
      }).then(get);
    }
  };
}
