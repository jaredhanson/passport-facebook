/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The Facebook authentication strategy authenticates requests by delegating to
 * Facebook using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Facebook application's App ID
 *   - `clientSecret`  your Facebook application's App Secret
 *   - `callbackURL`   URL to which Facebook will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new FacebookStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/facebook/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://www.facebook.com/dialog/oauth';
  options.tokenURL = options.tokenURL || 'https://graph.facebook.com/oauth/access_token';
  options.scopeSeparator = options.scopeSeparator || ',';

  this.profileFields = options.profileFields || [];

  OAuth2Strategy.call(this, options, verify);
  this.name = 'facebook';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);

/**
 * Return extra Facebook-specific parameters to be included in the authorization
 * request.
 *
 * Options:
 *  - `display`  Display mode to render dialog, { `page`, `popup`, `touch` }.
 *
 * @param {Object} options
 * @return {Object}
 * @api protected
 */
Strategy.prototype.authorizationParams = function (options) {
  var params = {},
      display = options.display;

  if (display) {
    params['display'] = display;
  }

  return params;
};

/**
 * Retrieve user profile from Facebook.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `facebook`
 *   - `id`               the user's Facebook ID
 *   - `username`         the user's Facebook username
 *   - `displayName`      the user's full name
 *   - `name.familyName`  the user's last name
 *   - `name.givenName`   the user's first name
 *   - `name.middleName`  the user's middle name
 *   - `gender`           the user's gender: `male` or `female`
 *   - `profileUrl`       the URL of the profile for the user on Facebook
 *   - `emails`           the proxied or contact email address granted by the user
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  var self = this,
      fields = this._convertProfileFields(this.profileFields);

  var url = 'https://graph.facebook.com/me'
          + (fields !== '' ? '?fields=' + fields : '');

  this._oauth2.getProtectedResource(url, accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
    
    try {
      var json = JSON.parse(body);
      
      var profile = { provider: 'facebook' };
      profile.id = json.id;
      profile.username = json.username;
      profile.displayName = json.name;

      if (self._includeProfileField('name')) {
        profile.name = { familyName: json.last_name,
                         givenName: json.first_name,
                         middleName: json.middle_name };
      }

      profile.gender = json.gender;
      profile.profileUrl = json.link;

      if (self._includeProfileField('emails')) {
        profile.emails = [{ value: json.email }];
      }
      if (self._includeProfileField('photos')) {
        profile.photos = [{ value: json.picture }];
      }

      profile._raw = body;
      profile._json = json;

      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
}

Strategy.prototype._includeProfileField = function(field) {
  return this.profileFields.length === 0
      || this.profileFields.indexOf(field) !== -1;
}

Strategy.prototype._convertProfileFields = function(profileFields) {
  var fields = [];
  var fieldsMap = {
    'id':          'id',
    'username':    'username',
    'displayName': 'name',
    'name':       ['last_name', 'first_name', 'middle_name'],
    'gender':      'gender',
    'profileUrl':  'link',
    'emails':      'email',
    'photos':      'picture'
  };
  profileFields.forEach(function (f) {
    if (typeof fieldsMap[f] === 'undefined') return;

    if (Array.isArray(fieldsMap[f])) {
      Array.prototype.push.apply(fields, fieldsMap[f]);
    } else {
      fields.push(fieldsMap[f]);
    }
  });

  return fields.join(',');
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
