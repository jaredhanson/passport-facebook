var vows = require('vows');
var assert = require('assert');
var util = require('util');
var url = require('url');
var FacebookStrategy = require('passport-facebook/strategy');


vows.describe('FacebookStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
    },
    
    'should be named facebook': function (strategy) {
      assert.equal(strategy.name, 'facebook');
    },
  },
  
  'strategy when redirecting for authorization': {
    topic: function () {
      var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      });

      return strategy;
    },

    'and display not set': {
      topic: function (strategy) {
        var mockRequest = {},
            url;

        // Stub strategy.redirect()
        var self = this;
        strategy.redirect = function (location) {
          self.callback(null, location)
        };
        strategy.authenticate(mockRequest);
      },

      'does not set authorization param': function(err, location) {
        var params = url.parse(location, true).query;
        assert.isUndefined(params.display);
      }
    },

    'and display set to mobile': {
      topic: function (strategy) {
        var mockRequest = {},
            url;

        // Stub strategy.redirect()
        var self = this;
        strategy.redirect = function (location) {
          self.callback(null, location)
        };
        strategy.authenticate(mockRequest, { display: 'mobile' });
      },

      'sets authorization param to mobile': function(err, location) {
        var params = url.parse(location, true).query;
        assert.equal(params.display, 'mobile');
      }
    }
  },

  'strategy when loading user profile': {
    topic: function() {
      var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth2.getProtectedResource = function(url, accessToken, callback) {
        var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
        
        callback(null, body, undefined);
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'facebook');
        assert.equal(profile.id, '500308595');
        assert.equal(profile.username, 'jaredhanson');
        assert.equal(profile.displayName, 'Jared Hanson');
        assert.equal(profile.name.familyName, 'Hanson');
        assert.equal(profile.name.givenName, 'Jared');
        assert.equal(profile.gender, 'male');
        assert.equal(profile.profileUrl, 'http://www.facebook.com/jaredhanson');
        assert.lengthOf(profile.emails, 1);
        assert.equal(profile.emails[0].value, 'jaredhanson@example.com');
      },
      'should set raw property' : function(err, profile) {
        assert.isString(profile._raw);
      },
      'should set json property' : function(err, profile) {
        assert.isObject(profile._json);
      },
    },
  },
  
  'strategy when loading user profile and encountering an error': {
    topic: function() {
      var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth2.getProtectedResource = function(url, accessToken, callback) {
        callback(new Error('something-went-wrong'));
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },
      
      'should error' : function(err, req) {
        assert.isNotNull(err);
      },
      'should wrap error in InternalOAuthError' : function(err, req) {
        assert.equal(err.constructor.name, 'InternalOAuthError');
      },
      'should not load profile' : function(err, profile) {
        assert.isUndefined(profile);
      },
    },
  },

  'strategy when configured to load specific profile fields': {
    topic: function() {
      var strategy = new FacebookStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        profileFields: ['id', 'photos']
      },
      function() {});

      // mock
      strategy._oauth2.getProtectedResource = function(url, accessToken, callback) {
        var body = '{"id":"500308595","picture":"http://profile.ak.fbcdn.net/blahblahblah.jpg"}';

        callback(null, body, undefined);
      }

      return strategy;
    },

    'when converting field names to facebook api': {
      topic: function(strategy) {
        this.callback(null, strategy._convertProfileFields(strategy.profileFields));
      },

      'should return a string of comma-separated field names': function(err, fields) {
        assert.equal(fields, 'id,picture');
      }
    },

    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }

        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },

      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load specific fields': function(err, profile) {
        assert.equal(profile.provider, 'facebook');
        assert.equal(profile.id, '500308595');
        assert.isUndefined(profile.username);
        assert.isUndefined(profile.displayName);
        assert.isUndefined(profile.name);
        assert.isUndefined(profile.gender);
        assert.isUndefined(profile.profileUrl);
        assert.isUndefined(profile.emails);
        assert.deepEqual(profile.photos, [{value: 'http://profile.ak.fbcdn.net/blahblahblah.jpg' }]);
      }
    }

  },
  
}).export(module);
