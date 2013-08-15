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
  
  describe('handling a return request in which authorization has failed with an error', function() {
    var info;
  
    before(function(done) {
      chai.passport(strategy)
        .fail(function(i) {
          info = i;
          done();
        })
        .req(function(req) {
          req.query = {};
          req.query.error_code = '901';
          req.query.error_message = 'This app is in sandbox mode.  Edit the app configuration at http://developers.facebook.com/apps to make the app publicly visible.';
        })
        .authenticate();
    });
  
    it('should fail with info', function() {
      expect(info).to.not.be.undefined;
      expect(info.code).to.equal(901);
      expect(info.message).to.equal('This app is in sandbox mode.  Edit the app configuration at http://developers.facebook.com/apps to make the app publicly visible.');
    });
  });
  
});
