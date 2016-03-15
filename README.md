# node-accounts

**node-accounts** is a simple User Management module for Node.js.

Current version supports logins only with providers(Google, Yahoo, Facebook, etc.).

## Usage

All you need to do is to create an application, and then use appKey for managing users.

#### Create a new app
```
var Accounts = require('accounts').mongo(config);
var appKey;

Accounts.apps.create({
    name: 'Test app'
  }).then(function(app) {
    appKey = app.key;
  });
```

#### Provider login
```
var Accounts = require('accounts').mongo(config);
var appKey = process.env.ACOUNTS_APP_KEY;
var AppAccounts = Accounts.api(appKey);

AppAccounts.users.login(profile)
  .then(function(user) {
    if (user) {
      console.log(account);
    }
    else {
      console.log('login faild');
    }
  });
```
Where `Profile` is a Passport [User Profile](http://passportjs.org/guide/profile/)
```
var profile = {
  provider: 'facebook',
  id: '123124234235123',
  displayName: 'Dumitru K',
  accessData: {
    accessToken:'dsgsgs', refreshToken:'gerge'
  }
};
```

## API

### .mongo(options)

Creates a MongoDB client.

## Client API

### admin

- **sync**() - Syncronize DB tables
- **drop**(secret) - Drop DB tables. Useful for tests.

### apps

- **create**(data) - Create a new application.
- **getByKey**(key) - Get an application by key.
- **deleteByKey**(key) - Delete an application by key.

### api(appKey)

Creates an application Accounts object for an app key.

## App Accounts API

### users

- **getById**(id, options) - Get an user object by id.
- **getByUsername**(username, options) - Get an user object by username.
- **getByKey**(key, options) - Get an user object by unique key.
- **deleteById**(id, options) - Delete an user by id.
- **update**(user, options) - Update user fields.
- **login**(profile, options) - User login.

### connections

- **getById**(id, options) - Get an user connection by id.
- **findByUserId**(userId, options) - Find user connections by user id.
- **deleteById**(id, options) - Delete an user connection by id.
- **deleteByUserId**(userId, options) - Delete user connections by user id.
