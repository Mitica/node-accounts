var config = require('./config.json'),
  AD = require('../lib')(config.connection),
  Promise = require('bluebird'),
  api, appKey='c38d94305119c3e323df6d132791eccb';

function sync() {
  return AD.sync().then(function() {
    console.log('sync OK');
  }).error(function(error) {
    console.log(error);
  })
}

function drop() {
  return AD.drop().then(function() {
    console.log('drop OK');
  }).error(function(error) {
    console.log(error);
  })
}

function createApp() {
  return AD.apps.create({
    name: 'Test'
  }).then(function(app) {
    console.log('created app:');
    console.log(app);
    return app;
  }).error(function(error) {
    console.log(error);
  })
}
//drop();
//sync();
return;
createApp().then(function(data) {
  api = data;
});
return;
function getApi() {
  if (api) return Promise.resolve(api);
  return AD.api(appKey).then(function(data) {
    api = data;
    return api;
  });
}


getApi().then(function(){
  api.apps.byKey(appKey).then(function(app){
    console.log('got app: ');
    console.log(app);
  })
});