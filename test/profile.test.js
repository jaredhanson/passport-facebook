/* global describe, it, before, expect */
/* jshint expr: true */

var Profile = require('../lib/profile')
  , fs = require('fs')


describe('Profile.parse', function() {
    
  describe('profile with picture attribute in orginal format', function() {
    var profile;
    
    before(function(done) {
      fs.readFile('test/fixtures/picture.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal('http://profile.ak.fbcdn.net/hprofile-ak-prn1/example.jpg');
      expect(profile.emails).to.be.undefined;
    });
  });
  
  describe('profile with picture attribute in October 2012 breaking changes format', function() {
    var profile;
    
    before(function(done) {
      fs.readFile('test/fixtures/picture-2012-10.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal('http://profile.ak.fbcdn.net/hprofile-ak-prn1/example.jpg');
    });
  });
  
});
