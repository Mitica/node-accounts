var config = require('./config.json'),
  AD = require('../lib')(config.connection),
  //chai = require('chai'),
  //chaiAsPromised = require('chai-as-promised'),
  //should = require('chai').should(),
  appKey = '81070c9016b8eca1d3de7eb34358adcf',//'280bf803f37f12de9af3b32846ad47ef',
  api;

//chai.use(chaiAsPromised);

function loginWithProviderTest(profile, accessData) {
  return api.accounts.providerLogin(profile, accessData).then(function(account) {
    console.log(account);
  }).error(function(error){
    throw error;
  });
}

AD.api(appKey).then(function(result) {
  api = result;
  loginWithProviderTest(profile, accessData);
}).error(function(error) {
  //console.log('error');
  throw error;
});
//deleteAppTest('test');

var profile = {
  displayName: 'Dumitru C',
  provider: 'goOgle',
  id: '1231231',
  emails:[{value:'canteadumitru@gmail.com'}],
  name:{
    familyName: 'Cantea',
    givenName: 'Dumitru'
  }
}

var accessData = {
  identifier: 'ertertetrre'
}