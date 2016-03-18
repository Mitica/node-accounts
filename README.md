# node-accounts

**accounts** is a simple User Management module for Node.js.

Current version supports logins only with providers(Google, Yahoo, Facebook, etc.).

## Usage

All you need to do is to create an application, and then use appId for managing users.

#### Create a new app
```
var Accounts = require('accounts').client(storage);
var appId;

Accounts.apps.create({
    name: 'Test app'
  }).then(function(app) {
    appId = app.id;
  });
```

#### Provider login
```
var Accounts = require('accounts').client(storage);
var appId = process.env.ACCOUNTS_APP_ID;
var App = Accounts.app(appId);

App.login(profile)
  .then(function(user) {
    if (user) {
      console.log(user);
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

### client(storage, options)

Creates a new Client.

## Client API

### admin

- **sync**() - Syncronize DB tables.
- **drop**(secret) - Drop DB tables. Useful for tests.

### apps

- **create**(data) - Create a new application.
- **getByKey**(key) - Get an application by key.
- **deleteByKey**(key) - Delete an application by key.

### app(appId)

Creates a new Application Client object for a given app id.

## Application Client API

### login(profile, options) - User login.

### users

- **create**(user, options) - Create a new user.
- **deleteById**(id, options) - Delete an user by id.
- **getById**(id, options) - Get an user object by id.
- **getByUsername**(username, options) - Get an user object by username.
- **update**(user, options) - Update user fields.

### connections

- **create**(connection, options) - Create a new connection.
- **deleteById**(id, options) - Delete an user connection by id.
- **deleteByUserId**(userId, options) - Delete user connections by user id.
- **findByUserId**(userId, options) - Find user connections by user id.
- **getById**(id, options) - Get an user connection by id.
- **update**(data, options) - Update connection fields.
