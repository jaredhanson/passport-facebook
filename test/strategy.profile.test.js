/* global describe, it, before, expect */
/* jshint expr: true */

var FacebookStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {

  describe('fetched from default endpoint', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://graph.facebook.com/v3.2/me') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');

      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
      expect(profile.displayName).to.equal('Jared Hanson');
      expect(profile.name.familyName).to.equal('Hanson');
      expect(profile.name.givenName).to.equal('Jared');
      expect(profile.gender).to.equal('male');
      expect(profile.profileUrl).to.equal('http://www.facebook.com/jaredhanson');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0].value).to.equal('jaredhanson@example.com');
      expect(profile.photos).to.be.undefined;
    });

    it('should set raw property', function() {
      expect(profile._raw).to.be.a('string');
    });

    it('should set json property', function() {
      expect(profile._json).to.be.an('object');
    });
  }); // fetched from default endpoint

  describe('fetched from default endpoint wih locale', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        locale: 'en_US'
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://graph.facebook.com/v3.2/me?locale=en_US') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };

    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); // fetched from default endpoint with locale

  describe('fetched from default endpoint, with appsecret_proof', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        enableProof: true
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://graph.facebook.com/v3.2/me?appsecret_proof=e941110e3d2bfe82621f0e3e1434730d7305d106c5f68c87165d0b27a4611a4a') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); // fetched from default endpoint, with appsecret_proof

  describe('fetched from default endpoint, with profile fields mapped from Portable Contacts schema', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        profileFields: ['id', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos']
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://graph.facebook.com/v3.2/me?fields=id,username,name,last_name,first_name,middle_name,gender,link,email,picture') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); // fetched from default endpoint, with profile fields mapped from Portable Contacts schema

  describe('fetched from default endpoint, with profile fields mapped from Portable Contacts schema, with appsecret_proof', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        profileFields: ['id', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos'],
        enableProof: true
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://graph.facebook.com/v3.2/me?appsecret_proof=e941110e3d2bfe82621f0e3e1434730d7305d106c5f68c87165d0b27a4611a4a&fields=id,username,name,last_name,first_name,middle_name,gender,link,email,picture') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); // fetched from default endpoint, with profile fields mapped from Portable Contacts schema, with appsecret_proof

  describe('fetched from default endpoint, with profile fields a mix of mapped from Portable Contacts schema and native Facebook properties', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        profileFields: ['id', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos', 'public_key', 'updated_time']
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://graph.facebook.com/v3.2/me?fields=id,username,name,last_name,first_name,middle_name,gender,link,email,picture,public_key,updated_time') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com", "updated_time": "2013-11-02T18:33:09+0000"}';
      callback(null, body, undefined);
    }


    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });

    it('should have additional fields in profile._json', function() {
      expect(profile._json.updated_time).to.equal('2013-11-02T18:33:09+0000');
    });
  }); // fetched from default endpoint, with profile fields mapped from Portable Contacts schema

  describe('fetched from default endpoint, with profile fields being an empty array', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        profileFields: []
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://graph.facebook.com/v3.2/me') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); // fetched from default endpoint, with profile fields being an empty array

  describe('fetched from older version with fields specified in URL', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        profileURL: 'https://graph.facebook.com/v2.2/me?fields=id,username'
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://graph.facebook.com/v2.2/me?fields=id,username') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); // fetched from older version with fields specified in URL

  describe('fetched from older version with fields specified in URL, with appsecret_proof', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        profileURL: 'https://graph.facebook.com/v2.2/me?fields=id,username',
        enableProof: true
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://graph.facebook.com/v2.2/me?fields=id,username&appsecret_proof=e941110e3d2bfe82621f0e3e1434730d7305d106c5f68c87165d0b27a4611a4a') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
      callback(null, body, undefined);
    };


    var profile;

    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('facebook');
      expect(profile.id).to.equal('500308595');
      expect(profile.username).to.equal('jaredhanson');
    });
  }); // fetched from older version with fields specified in URL

  describe('error caused by invalid token', function() {
    var strategy =  new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      var body = '{"error":{"message":"Invalid OAuth access token.","type":"OAuthException","code":190,"fbtrace_id":"XxXXXxXxX0x"}}';

      callback({ statusCode: 400, data: body });
    };

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
      expect(err.subcode).to.be.undefined;
      expect(err.traceID).to.equal('XxXXXxXxX0x');
    });
  }); // error caused by invalid token

  describe('error caused by malformed response', function() {
    var strategy =  new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      var body = 'Hello, world.';
      callback(null, body, undefined);
    };


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
  }); // error caused by malformed response

  describe('internal error', function() {
    var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      return callback(new Error('something went wrong'));
    }


    var err, profile;

    before(function(done) {
      strategy.userProfile('wrong-token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });

    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
      expect(err.oauthError).to.be.an.instanceOf(Error);
      expect(err.oauthError.message).to.equal('something went wrong');
    });

    it('should not load profile', function() {
      expect(profile).to.be.undefined;
    });
  }); // internal error

});
