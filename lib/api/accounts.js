var validator = require('../validation'),
  assert = require('assert'),
  slug = require('slug'),
  crypto = require('crypto'),
  autil = require('./accountsUtil');


module.exports = function(db, app, options) {

  //accounts API
  return {
    // get account by key
    byId: function(id) {
      return db.Account.find({
        id: id,
        appId: app.id
      }).then(get);
    },
    // get account by key
    byGlobalId: function(id) {
      return db.Account.find({
        globalAccountId: id,
        appId: app.id
      }).then(get);
    },

    loginWithProvider: function(profile, accessData) {
      assert.ok(profile);
      assert.ok(accessData);

      validator.assert('accounts/profile', profile);

      return autil.loginWithProvider(db, app, profile, accessData);
    }
  };
}


function get(data) {
  if (data && data.get)
    return data.get();
  return null;
}