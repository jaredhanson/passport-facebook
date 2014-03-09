/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , FacebookStrategy = require('../lib/strategy');


describe('Strategy', function() {
    
  var strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    },
    function() {});
    
  it('should be named facebook', function() {
    expect(strategy.name).to.equal('facebook');
  });
  
  describe('handling a return request in which authorization was denied by user', function() {
    var info;
  
    before(function(done) {
      chai.passport.use(strategy)
        .fail(function(i) {
          info = i;
          done();
        })
        .req(function(req) {
          req.query = {};
          req.query.error = 'access_denied';
          req.query.error_code = '200';
          req.query.error_description  = 'Permissions error';
          req.query.error_reason = 'user_denied';
        })
        .authenticate();
    });
  
    it('should fail with info', function() {
      expect(info).to.not.be.undefined;
      expect(info.message).to.equal('Permissions error');
    });
  });
  
  describe('handling a return request in which authorization has failed with an error', function() {
    var err;
  
    before(function(done) {
      chai.passport.use(strategy)
        .error(function(e) {
          err = e;
          done();
        })
        .req(function(req) {
          req.query = {};
          req.query.error_code = '901';
          req.query.error_message = 'This app is in sandbox mode.  Edit the app configuration at http://developers.facebook.com/apps to make the app publicly visible.';
        })
        .authenticate();
    });
  
    it('should error', function() {
      expect(err.constructor.name).to.equal('FacebookAuthorizationError');
      expect(err.message).to.equal('This app is in sandbox mode.  Edit the app configuration at http://developers.facebook.com/apps to make the app publicly visible.');
      expect(err.code).to.equal(901);
      expect(err.status).to.equal(500);
    });
  });
  
});
