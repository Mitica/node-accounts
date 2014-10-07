var validator = require('../validation'),
  assert = require('assert'),
  slug = require('slug'),
  crypto = require('crypto'),
  _ = require('lodash');

function debug(message) {
  console.log(message);
}

module.exports.loginWithProvider = function(db, app, profile, accessData) {
  debug('start loginWithProvider');
  var ac_id = formatAccountConnectionId(app.id, profile);

  return db.AccountConnection.find({
    where: {
      id: ac_id
    }
  }).then(function(ac) {
    //ac = get(ac);
    if (ac) {
      debug('found account by account id');
      return getAccountById(db, app, ac.accountId).then(get);
    }

    var globalProfile = buildGlobalProfile(profile);
    if (globalProfile.email) {
      return db.Account.find({
        where: {
          appId: app.id,
          email: globalProfile.email
        }
      }).then(function(account) {
        //account = get(account);
        if (account) {
          debug('found account by email');
          connect(db, app, account.id, profile, accessData, account);
          return account.get();
        }
        return createAccountFromProvider(db, app, profile, accessData, globalProfile);
      });
    }
    return createAccountFromProvider(db, app, profile, accessData, globalProfile);
  });
}

function executeLogin(state, db, app, profile, accessData) {

}

module.exports.connect = function(db, app, accountId, profile, accessData) {
  return connectAccount(db, app, accountId, profile, accessData);
}

function connectAccount(db, app, accountId, profile, accessData, account) {
  function _connect() {
    var globalProfile = buildGlobalProfile(profile);

    return db.GlobalProfile.find({
      where: {
        id: globalProfile.id
      }
    }).then(function(data) {
      //data = get(data);
      if (data) {
        globalProfile = data;
        if (!account.globalAccountId) {
          account.globalAccountId = globalProfile.globalAccountId;
          account.save();
        } else if (account.globalAccountId !== globalProfile.globalAccountId) {
          globalProfile.globalAccountId = account.globalAccountId;
          var globalAccount = globalProfile.getGlobalAccount();
          globalAccount.mergedWithId = account.globalAccountId;
          globalAccount.mergedAt = new Date();
          globalAccount.status = 'merged';
          globalAccount.save();
          globalProfile.save();
        }
        return account.get();
      }
      if (globalProfile.email) {
        return db.GlobalProfile.find({
          where: {
            email: globalProfile.email
          }
        }).then(function(data) {
          //data = get(data);
          if (data) {
            globalProfile.globalAccountId = data.globalAccountId;
            return db.GlobalProfile.create(globalProfile).then(function(data) {
              globalProfile = data;
              if (!account.globalAccountId) {
                account.globalAccountId = globalProfile.globalAccountId;
                account.save();
              } else if (account.globalAccountId !== globalProfile.globalAccountId) {
                globalProfile.globalAccountId = account.globalAccountId;
                var globalAccount = globalProfile.getGlobalAccount();
                globalAccount.mergedWithId = account.globalAccountId;
                globalAccount.mergedAt = new Date();
                globalAccount.status = 'merged';
                globalAccount.save();
                globalProfile.save();
              }
              return account.get();
            });
          }
          //
          createGlobalAccount(db, app, profile, accessData, account);
        });
      }
      createGlobalAccount(db, app, profile, accessData, account);
      //
    });
  }

  if (account)
    return _connect();

  return db.Account.find({
    where: {
      appId: app.id,
      id: accountId
    }
  }).then(function(data) {
    //data = get(data);
    if (!data) throw new Error('Not found account to connect!');

    account = data;

    return _connect();
  });
}

function getAccountById(db, app, id) {
  return db.Account.find({
    where: {
      id: id,
      appId: app.id
    }
  });
}

function createGlobalAccount(db, app, profile, accessData, account) {
  var globalProfile = buildGlobalProfile(profile);
  //globalProfile.globalAccountId = account.globalAccountId;
  var globalAccount = buildGlobalAccount(globalProfile);

  function createGlobalProfile() {
    return db.GlobalProfile.create(globalProfile).then(function(data) {
      globalProfile = data;
      if (!account.globalAccountId) {
        account.globalAccountId = globalProfile.globalAccountId;
        account.save();
      }
      return account.get();
    });
  }

  if (account.globalAccountId) {
    globalProfile.globalAccountId = account.globalAccountId;
    return createGlobalProfile();
  }

  return db.GlobalAccount.create(globalAccount).then(function(data) {
    globalAccount = data; //get(data);
    globalProfile.globalAccountId = globalAccount.id;
    return createGlobalProfile();
  });
}

function createAccountFromProvider(db, app, profile, accessData, globalProfile) {
  debug('createAccountFromProvider');
  //var accountConnection = buildAccountConnection(profile, accessData);

  return db.GlobalProfile.find({
    where: {
      id: globalProfile.id
    }
  }).then(function(data) {
    //data = get(data);
    if (data) {
      debug('found GlobalProfile');
      globalProfile = data;
      return createAccountFromGlobalProfile(db, app, profile, accessData, globalProfile);
    }
    debug('creating global account');
    var globalAccount = buildGlobalAccount(globalProfile);
    return db.GlobalAccount.create(globalAccount).then(function(data) {
      //globalAccount = get(data);
      debug('created GlobalAccount');
      globalAccount = data;
      globalProfile.globalAccountId = globalAccount.id;
      debug('creating GlobalProfile');
      return db.GlobalProfile.create(globalProfile).then(function(data) {
        //globalProfile = get(data);
        debug('created GlobalProfile');
        globalProfile = data;
        return createAccountFromGlobalProfile(db, app, profile, accessData, globalProfile, globalAccount);
      });
    });
  });
}


function createAccountFromGlobalProfile(db, app, profile, accessData, globalProfile, globalAccount) {
  var accountConnection = buildAccountConnection(app, profile, accessData);

  function createAccount() {
    debug('creating account...');
    var account = {
      globalAccountId: globalAccount.id,
      appId: app.id,
      email: globalProfile.email || globalAccount.email || void(0),
      username: globalAccount.username || globalProfile.username,
      displayName: globalAccount.displayName,
      familyName: globalAccount.familyName,
      givenName: globalAccount.givenName,
      middleName: globalAccount.middleName,
      gender: globalAccount.gender || globalProfile.gender || void(0),
      photo: globalAccount.photo || globalProfile.photo || void(0)
    };
    if (account.email) account.email = account.email.trim().toLowerCase();

    account.username = account.username || account.displayName.replace(/ /gi, '');
    account.username = slug(account.username).toLowerCase();
    if (account.username.length < 5) account.username += getRandomInt();
    return getUniqueAccountUsername(db, app, account.username, '').then(function(username) {
      account.username = username;
      return db.Account.find({
        where: {
          globalAccountId: account.globalAccountId,
          appId: app.id
        }
      }).then(function(data) {
        if (data){
          //updateAccountData
          return data.get();
        }
        return db.Account.create(account).then(function(account) {
          //account = get(account);
          debug('created account: ');
          //debug(account);
          accountConnection.accountId = account.id;
          debug('creating AccountConnection...');
          //accountConnection.id = formatAccountConnectionId(account.id, accountConnection.profile, accountConnection.providerProfileId);
          db.AccountConnection.create(accountConnection).then(function() {
            debug('created AccountConnection');
            return account.get();
          });
        });
      });
    });
  }

  if (globalAccount) {
    return createAccount();
  } else {
    return db.GlobalAccount.find({
      where: {
        id: globalProfile.globalAccountId
      }
    }).then(function(gaccount) {
      //globalAccount = get(gaccount);
      globalAccount = gaccount;
      return createAccount();
    });
  }

}

function getUniqueAccountUsername(db, app, username, suffix) {
  var nname = username + suffix;
  console.log('finding username: ' + nname);
  return db.Account.find({
    where: {
      username: nname,
      appId: app.id
    }
  }).then(function(acc) {
    var acc = get(acc);
    if (acc) {
      debug('found account: ');
      //debug(acc.get());
      return getUniqueAccountUsername(db, app, username, String(getRandomInt()));
    }
    return nname;
  });
}

function buildGlobalProfile(profile) {
  var gp = {
    provider: profile.provider.trim().toLowerCase(),
    providerProfileId: profile.id.trim(),
    displayName: profile.displayName.trim(),
    username: profile.username,
    profileUrl: profile.profileUrl
  };

  gp.id = formatGlobalProfileId(gp.provider, gp.providerProfileId);

  if (profile.gender) pg.gender = profile.gender;

  if (profile.name) {
    gp.familyName = profile.name.familyName;
    gp.givenName = profile.name.givenName;
    gp.middleName = profile.name.middleName;
  }
  if (profile.emails && profile.emails.length > 0) {
    gp.email = profile.emails[0].value.trim().toLowerCase();
  }
  if (profile.photos && profile.photos.length > 0) {
    gp.photo = profile.photos[0].value.trim();
  }

  return gp;
}

function buildGlobalAccount(globalProfile) {
  var account = _.clone(globalProfile);

  return account;
}

function buildAccountConnection(app, profile, accessData) {
  var ac = {
    id: formatAccountConnectionId(app.id, profile),
    provider: profile.provider.trim().toLowerCase(),
    providerProfileId: profile.id,
    accessData: accessData,
    appId: app.id
  };

  return ac;
}

function formatAccountConnectionId(appId, profile) {
  profile.provider = profile.provider.trim().toLowerCase();
  profile.id = profile.id.trim();
  var key = appId + ':' + profile.provider + ':' + profile.id;

  return crypto.createHash('sha1').update(key).digest('hex');
}

function formatGlobalProfileId(provider, id) {
  return crypto.createHash('sha1').update(provider + ':' + id).digest('hex');
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  min = min || 10;
  max = max || 999999;
  return Math.floor(Math.random() * (max - min)) + min;
}

function get(data) {
  if (data && data.get)
    return data.get();
  return null;
}
