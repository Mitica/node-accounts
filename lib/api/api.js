module.exports = function(db, app, options) {

  var accounts = require('./accounts')(db, app, options);

  //API
  return {
    accounts: accounts
  };
}
