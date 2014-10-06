var validator = require('../validation'),
  assert = require('assert'),
  slug = require('slug'),
  crypto = require('crypto'),
  _ = require('lodash');


module.exports.loginWithProvider = function(db, app, profile, accessData) {
  var ac_key = formatAccountConnectionKey(app.id, profile);

  return db.AccountConnection.find({
    key: ac_key
  }).then(function(ac) {
    ac = get(ac);
    if (ac)
      return getAccountById(db, app, ac.accountId);

    var globalProfile = buildGlobalProfile(profile);
    if (globalProfile.email) {
      return db.Account.find({
        appId: app.id,
        email: globalProfile.email
      }).then(function(account) {
        account = get(account);
        if (account) {
          connect(db, app, account.id, profile, accessData, account);
          return account;
        }

        return createAccountFromProvider(db, app, profile, accessData, globalProfile);
      });
    }
    return createAccountFromProvider(db, app, profile, accessData, globalProfile);
  });
}

var connect = module.exports.connect = function(db, app, accountId, profile, accessData, account) {
  function _connect() {
    var globalProfile = buildGlobalProfile(profile);

    return db.GlobalProfile.find({
      id: globalProfile.id
    }).then(function(data) {
      data = get(data);
      if (data) {
        globalProfile = data;
        //if(globalProfile.globalAccountId !== account.globalAccountId)
        return account;
      }
      if (globalProfile.email) {
        return db.GlobalProfile.find({
          email: globalProfile.email
        }).then(function(data) {
          data = get(data);
          if (data) {
            globalProfile.globalAccountId = data.globalAccountId;
            return db.GlobalProfile.create(globalProfile).then(function() {
              return account;
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
    appId: app.id,
    id: accountId
  }).then(function(data) {
    data = get(data);
    if (!data) throw new Error('Not found account to connect!');

    account = data;

    return _connect();
  });
}

function getAccountById(db, app, id) {
  return db.Account.find({
    id: id,
    appId: app.id
  }).then(get);
}

function createGlobalAccount(db, app, profile, accessData, account) {
  var globalProfile = buildGlobalProfile(profile);
  var globalAccount = buildGlobalAccount(globalProfile);

  function createGlobalProfile() {
    return db.GlobalProfile.create(globalProfile).then(function(data) {
      globalProfile = get(data);
      if (!account.globalAccountId) {
        db.Account.find({
          id: account.id
        }).then(function(data) {
          data.updateAttributes({
            globalAccountId: globalProfile.globalAccountId
          });
        });
      }
      return account;
    });
  }

  if (account.globalAccountId) {
    globalProfile.globalAccountId = account.globalAccountId;
    return createGlobalProfile();
  }

  return db.GlobalAccount.create(globalAccount).then(function(data) {
    globalAccount = get(data);
    globalProfile.globalAccountId = globalAccount.id;
    return createGlobalProfile();
  });
}

function createAccountFromProvider(db, app, profile, accessData, globalProfile) {

  var accountConnection = buildAccountConnection(profile, accessData);

  return db.GlobalProfile.find({
    id: globalProfile.id
  }).then(function(data) {
    data = get(data);
    if (data) {
      globalProfile = data;
      return createAccountFromGlobalProfile(db, app, profile, accessData, globalProfile, accountConnection);
    }
    var globalAccount = buildGlobalAccount(globalProfile);
    return db.GlobalAccount.create(globalAccount).then(function(data) {
      globalAccount = get(data);
      globalProfile.globalAccountId = globalAccount.id;
      return db.GlobalProfile.create(globalProfile).then(function(data) {
        globalProfile = get(data);
        return createAccountFromGlobalProfile(db, app, profile, accessData, globalProfile, accountConnection);
      });
    });
  });
}


function createAccountFromGlobalProfile(db, app, profile, accessData, globalProfile, accountConnection, globalAccount) {

  function createAccount() {
    var account = {
      globalAccountId: globalAccount.id,
      appId: app.id,
      email: globalProfile.email || globalAccount.email,
      username: globalAccount.username || globalProfile.username,
      displayName: globalAccount.displayName,
      familyName: globalAccount.familyName,
      givenName: globalAccount.givenName,
      middleName: globalAccount.middleName,
      gender: globalAccount.gender || globalProfile.gender,
      photo: globalAccount.photo || globalProfile.photo
    };
    if (account.email) account.email = account.email.trim().toLowerCase();

    account.username = account.username || account.displayName.replace(/ /gi, '');
    account.username = slug(account.username).toLowerCase();
    if (account.username.length < 5) account.username += getRandomInt();
    return getUniqueAccountUsername(account.username, '').then(function(username) {
      account.username = username;
      return db.Account.create(account).then(function(account) {
        account = get(account);
        accountConnection.id = formatAccountConnectionId(account.id, accountConnection.profile, accountConnection.providerProfileId);
        db.AccountConnection.create(accountConnection).then(function() {
          return account;
        });
      });
    });
  }

  if (globalAccount) {
    return createAccount();
  } else {
    return db.GlobalAccount.find({
      id: globalProfile.globalAccountId
    }).then(function(gaccount) {
      globalAccount = get(gaccount);
      return createAccount();
    });
  }

}

function getUniqueAccountUsername(username, suffix) {
  var nname = username + suffix;
  return db.Account.find({
    username: nname,
    appId: app.id
  }).then(function(acc) {
    var acc = get(acc);
    if (acc) return getUniqueAccountUsername(username, String(getRandomInt()));
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
    key: formatAccountConnectionKey(app.id, profile),
    provider: profile.provider.trim().toLowerCase(),
    providerProfileId: profile.id,
    accessData: accessData,
    appId: app.id
  };

  return ac;
}

function formatAccountConnectionKey(appId, profile) {
  profile.provider = profile.provider.trim().toLowerCase();
  profile.id = profile.id.trim();
  var key = appId + ':' + profile.provider + ':' + profile.id;

  return crypto.createHash('sha1').update(key).digest('hex');
}

function formatGlobalProfileId(provider, providerProfileId) {
  return crypto.createHash('sha1').update(provider + ':' + providerProfileId).digest('hex');
}

function formatAccountConnectionId(accountId, provider, providerProfileId) {
  return crypto.createHash('sha1').update(accountId + ':' + provider + ':' + providerProfileId).digest('hex');
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
