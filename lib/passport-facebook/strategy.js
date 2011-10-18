/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy;


function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://www.facebook.com/dialog/oauth';
  options.tokenURL = options.tokenURL || 'https://graph.facebook.com/oauth/access_token';
  
  OAuth2Strategy.call(this, options, verify);
  this.name = 'facebook';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.getProtectedResource('https://graph.facebook.com/me', accessToken, function (err, body, res) {
    if (err) { return done(err); }
    
    console.log('Facebook user profile:');
    console.log('  body: ' + util.inspect(body));
    
    try {
      json = JSON.parse(body);
      console.log(util.inspect(json));
    } catch(e) {
      done(e);
    }
  });
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
