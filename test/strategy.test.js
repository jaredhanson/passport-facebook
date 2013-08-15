var FacebookStrategy = require('../lib/strategy');


describe('Strategy', function() {
    
  var strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    },
    function() {});
    
  it('should be named facebook', function() {
    expect(strategy.name).to.equal('facebook');
  });
  
});
