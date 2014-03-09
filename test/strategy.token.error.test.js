/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , FacebookStrategy = require('../lib/strategy');


describe('Strategy', function() {
    
  describe('using token endpoint that responds with non-standard error', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});

    // inject a "mock" oauth2 instance
    strategy._oauth2.getOAuthAccessToken = function(code, options, callback) {
      return callback({ statusCode: 400, data: '{"error":{"message":"Invalid verification code format.","type":"OAuthException","code":100}}' });
    };
  
    describe('handling response', function() {
      var err;
  
      before(function(done) {
        chai.passport.use(strategy)
          .error(function(e) {
            err = e;
            done();
          })
          .req(function(req) {
            req.query = {};
            req.query.code = 'SplxlOBeZQQYbYS6WxSbIA+ALT1';
          })
          .authenticate();
      });
  
      it('should error', function() {
        expect(err.constructor.name).to.equal('FacebookTokenError');
        expect(err.message).to.equal('Invalid verification code format.');
        expect(err.type).to.equal('OAuthException');
        expect(err.code).to.equal(100);
      });
    });
  });
  
  describe('using token endpoint that responds with standard error', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});

    // inject a "mock" oauth2 instance
    strategy._oauth2.getOAuthAccessToken = function(code, options, callback) {
      return callback({ statusCode: 400, data: '{"error":"invalid_grant","error_description":"The provided value for the input parameter \'code\' is not valid."} '});
    };
  
    describe('handling response', function() {
      var err;
  
      before(function(done) {
        chai.passport.use(strategy)
          .error(function(e) {
            err = e;
            done();
          })
          .req(function(req) {
            req.query = {};
            req.query.code = 'SplxlOBeZQQYbYS6WxSbIA+ALT1';
          })
          .authenticate();
      });
  
      it('should error', function() {
        expect(err.constructor.name).to.equal('TokenError');
        expect(err.message).to.equal('The provided value for the input parameter \'code\' is not valid.');
        expect(err.code).to.equal('invalid_grant');
      });
    });
  });
  
});
