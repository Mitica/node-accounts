# node-accounts

**node-accounts** is a User Management module for Node.js.
Supports Sequelize dialects: MySQL, MariaDB, SQLite and PostgreSQL

**node-accounts** works fine with profile providers(Google, Yahoo, Facebook, etc.).

Current version supports just `providerLogin` method.

## Usage

All you need to do is to create an application, and then to use appKey for accessing accounts.

#### Create a new app
```
var Accounts = require('accounts')(config.connection);
// `connection` if a Sequelize connection object (connectionString or object)
var appKey;

Accounts.apps.create({
    name: 'Test app'
  }).then(function(app) {
    appKey = app.key;
});
```

#### Provider login
```
var Accounts = require('accounts')(config.connection);
// `connection` if a Sequelize connection object (connectionString or object)
var appKey = 'ert457943346893695krjgerugui';
var api;

Accounts.api(appKey).then(function(result) {
  api = result;
  login();
});

function login(){
  api.accounts.providerLogin(profile, accessData).then(function(account){
    if(account)
      console.log(account);
    else
      console.log('login faild');
  });
}
```
Where `Profile` is a Passport [User Profile](http://passportjs.org/guide/profile/)
```
var profile = {
  provider: 'facebook',
  id: '123124234235123',
  displayName: 'Dumitru K'
};
```
and `accessData` is access data from the provider (can by JSON):
```
var accessData = {
  accessToken:'dsgsgs', refreshToken:'gerge'
}
```

### DB schema

#### Create/drop DB schema:
```
var Accounts = require('accounts')(config.connection);
//create db schema
Accounts.sync();
//drop db schema
Accounts.drop();
```
