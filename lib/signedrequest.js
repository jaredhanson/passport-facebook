
var SignedRequest = require('facebook-signed-request')
  , FacebookAuthorizationError = require('./errors/facebookauthorizationerror');

/**
 * `Strategy` constructor.
 *
 * Facebook Canvas apps receive an HTTPS POST to the URL defined by
 * the 'Secure Canvas URL' setting in the Facebook app settings.
 *
 * The POST body contains a property named 'signed_request' which can be decrypted
 * using the app secret to reveal information about the current user.
 *
 * Note: Facebook only accepts HTTPS connections for Canvas, this may
 * require an additional port to be bound for HTTPS traffic.
 *
 * For further details, refer to:
 * https://developers.facebook.com/apps/ 
 * https://developers.facebook.com/docs/reference/login/signed-request/
 *
 * Example Routes:
 *
 *   // This is the URL defined by the 'Secure Canvas URL' setting.
 *   // Note: This route must be available via SSL.
 *   app.post('/auth/facebook/canvas', 
 *     passport.authenticate('facebook', { successRedirect: '/',
 *                                         failureRedirect: '/auth/facebook/canvas/autologin' }));
 *   
 *   // Cannot forward to another URL via HTTP redirect, so we have to use a client-side hack instead.
 *   // ref: https://developers.facebook.com/docs/appsonfacebook/tutorial/#canvas
 *   app.get('/auth/facebook/canvas/autologin', function( req, res ){
 *     res.send( '<!DOCTYPE html>' +
 *                 '<body>' +
 *                   '<script type="text/javascript">' +
 *                     'top.location.href = "/auth/facebook";' +
 *                   '</script>' +
 *                 '</body>' +
 *               '</html>' );
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {

}

/**
 * Authenticate request by decrypting 'signed_request' in POST body.
 *
 * req.body = {
 *   signed_request: 'AABBCC... (variable length)',
 *   fb_locale: 'en_GB'
 * }
 *
 * For further details, refer to:
 * https://developers.facebook.com/docs/reference/login/signed-request/
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req, options) {

  var self = this,
      credentials = { secret: this._clientSecret },
      signedRequest = new SignedRequest( req.body.signed_request, credentials ),
      verified = function(err, user, info) {
        if (err) { return self.error(err); }
        if (!user) { return self.fail(info); }
        return self.success(user, info);
      };

  /**
   * Parsing the 'signed_request' returns information about the current user.
   *
   * request.data = {
   *   algorithm: 'HMAC-SHA256',
   *   expires: 1385762400,
   *   issued_at: 1385755943,
   *   oauth_token: 'AABBCC... (200 chars)',
   *   user: { country: 'gb', locale: 'en_GB', age: [Object] },
   *   user_id: '1111111111'
   * }
   */
  signedRequest.parse(function(errors, request){

    // Failed to parse 'signed_request'.
    if ( errors && errors.length ) {
      return self.error( new FacebookAuthorizationError( errors[0] ) );
    }

    // First time app has seen this user, redirect user to 'failureRedirect'.
    else if ( !request.data || !request.data.oauth_token ) {
      return self.fail( 'facebook app has not been authorized by this user' );
    }

    else if( request.isValid() ) {

      // Load the users profile information using the 'oauth_token'.
      self.userProfile( request.data.oauth_token, function(err,user) {

        // Verify token and user.
        if (err) { return self.error(err); }
        try {
          if (self._passReqToCallback) {
            return self._verify( req, request.data.oauth_token, null, (user && user._json), verified );
          }
          return self._verify( request.data.oauth_token, null, (user && user._json), verified );
        } catch (ex) {
          return self.error(ex);
        }
      });
    }

    // Facebook returned errors inside the request body.
    else if ( request.errors && request.errors.length ) {
      return self.error( new FacebookAuthorizationError( request.errors[0] ) );
    }

    // An unknown error has occurred.
    else {
      return self.error( new FacebookAuthorizationError('canvas login failed') );
    }
  });
}

module.exports = Strategy;