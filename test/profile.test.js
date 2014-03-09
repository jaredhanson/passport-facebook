/* global describe, it, expect, before */
/* jshint expr: true */

var fs = require('fs')
  , parse = require('../lib/profile').parse;


describe('profile.parse', function() {
    
  describe('picture field', function() {
    var profile;
    
    before(function(done) {
      fs.readFile('test/data/picture.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = parse(data);
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal('http://profile.ak.fbcdn.net/hprofile-ak-prn1/example.jpg');
      expect(profile.emails).to.be.undefined;
    });
  });
  
  describe('picture field, October 2012 breaking changes', function() {
    var profile;
    
    before(function(done) {
      fs.readFile('test/data/picture-2012-10.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = parse(data);
        done();
      });
    });
    
    it('should parse profile', function() {
      expect(profile.photos).to.have.length(1);
      expect(profile.photos[0].value).to.equal('http://profile.ak.fbcdn.net/hprofile-ak-prn1/example.jpg');
    });
  });
  
});
