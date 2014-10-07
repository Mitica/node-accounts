var config = require('./config.json'),
  AD = require('../lib')(config.connection),
  //chai = require('chai'),
  //chaiAsPromised = require('chai-as-promised'),
  //should = require('chai').should(),
  appKey = '70802af108b726bcc25adf5f63b3d286',
  api;

//chai.use(chaiAsPromised);

function loginWithProviderTest(profile, accessData) {
  return api.accounts.loginWithProvider(profile, accessData).then(function(account) {
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
  name:{
    familyName: 'Cantea',
    givenName: 'Dumitru'
  }
}

var accessData = {
  identifier: 'ertertetrre'
}