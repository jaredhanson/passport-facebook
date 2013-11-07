var FacebookStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {
  
  describe('handling API errors', function() {
    var strategy =  new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
  
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        var expected = 'https://graph.facebook.com/me?&appsecret_proof=e941110e3d2bfe82621f0e3e1434730d7305d106c5f68c87165d0b27a4611a4a';
        if (url != expected) { return callback(new Error('wrong url argument')); }
        if (accessToken != 'token') { return callback(new Error('wrong token argument')); }
      
        var body = '{"error":{"message":"Invalid OAuth access token.","type":"OAuthException","code":190}}';
    
        callback({ statusCode: 401, data: body });
      }
      
    var err, profile;
    before(function(done) {
      strategy.userProfile('token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('FacebookGraphAPIError');
      expect(err.message).to.equal('Invalid OAuth access token.');
      expect(err.type).to.equal('OAuthException');
      expect(err.code).to.equal(190);
    });
  });
  
  describe('handling internal OAuth errors', function() {
    var strategy =  new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
  
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        var expected = 'https://graph.facebook.com/me?&appsecret_proof=e941110e3d2bfe82621f0e3e1434730d7305d106c5f68c87165d0b27a4611a4a';
        if (url != expected) { return callback(new Error('wrong url argument')); }
        if (accessToken != 'token') { return callback(new Error('wrong token argument')); }
      
        var body = '{"error":{"message":"Invalid OAuth access token.","type":"OAuthException","code":190}}';
    
        callback({ statusCode: 401, x__data: body });
      }
      
    var err, profile;
    before(function(done) {
      strategy.userProfile('token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
    });
  });
  
  describe('handling malformed responses', function() {
    var strategy =  new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
  
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        var expected = 'https://graph.facebook.com/me?&appsecret_proof=e941110e3d2bfe82621f0e3e1434730d7305d106c5f68c87165d0b27a4611a4a';
        if (url != expected) { return callback(new Error('wrong url argument')); }
        if (accessToken != 'token') { return callback(new Error('wrong token argument')); }
      
        var body = 'Hello, world.';
        callback(null, body, undefined);
      }
      
    var err, profile;
    before(function(done) {
      strategy.userProfile('token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });
  
    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Failed to parse user profile');
    });
  });
  
});
