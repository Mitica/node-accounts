module.exports = function(db, app, options) {

  var apps = require('./apps')(db, app, options);

  //API
  return {
    apps: apps
  };
}