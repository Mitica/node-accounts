var validator = require('../validation'),
  assert = require('assert'),
  slug = require('slug'),
  crypto = require('crypto'),
  autil = require('./accountsUtil'),
  _ = require('lodash');


module.exports = function(db, app, options) {

  //accounts API
  return {
    // get account by key
    byId: function(id) {
      return db.Account.find({
        where: {
          id: id,
          appId: app.id
        }
      }).then(get);
    },
    // get account by key
    byGlobalId: function(id) {
      return db.Account.find({
        where: {
          globalAccountId: id,
          appId: app.id
        }
      }).then(get);
    },

    loginWithProvider: function(profile, accessData) {
      assert.ok(profile);
      assert.ok(accessData);
      if (!_.isString(accessData) && _.isPlainObject(accessData))
        accessData = JSON.stringify(accessData);
      else throw new Errro('invalid accessData');

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
