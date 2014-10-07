var config = require('./config.json'),
  AD = require('../lib')(config.connection),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  should = require('chai').should();

chai.use(chaiAsPromised);

function deleteAppTest(uname) {
  describe('AD', function() {
    describe('#dropApp()', function() {
      var appKey;
      it('should return app by uname', function() {
        return AD.apps.byUname(uname).should.eventually.have.property('key').then(function(key) {
          appKey = key;
        }).should.be.fulfilled;
      });

      it('should delete app', function() {
        should.exist(appKey);
        return AD.apps.drop(appKey).should.be.fulfilled;
      });
    });
  });
}

function createAppTest(name) {
  describe('AD', function() {
    describe('#createApp()', function() {
      it('should return created app', function() {
        return AD.apps.create({
          name: name
        }).should.eventually.exist.then(function(app) {
          console.log(app);
          return app;
        }).should.be.fulfilled;
      })
    });
  });
}

//deleteAppTest('test');
createAppTest('Test');
