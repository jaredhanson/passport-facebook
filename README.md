# passport-facebook

[![Build](https://img.shields.io/travis/jaredhanson/passport-facebook.svg)](https://travis-ci.org/jaredhanson/passport-facebook)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/passport-facebook.svg)](https://coveralls.io/r/jaredhanson/passport-facebook)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/passport-facebook.svg?label=quality)](https://codeclimate.com/github/jaredhanson/passport-facebook)
[![Dependencies](https://img.shields.io/david/jaredhanson/passport-facebook.svg)](https://david-dm.org/jaredhanson/passport-facebook)


[Passport](http://passportjs.org/) strategy for authenticating with [Facebook](http://www.facebook.com/)
using the OAuth 2.0 API.

This module lets you authenticate using Facebook in your Node.js applications.
By plugging into Passport, Facebook authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-facebook

## Usage

#### Configure Strategy

The Facebook authentication strategy authenticates users using a Facebook
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying an app ID, app secret, callback URL, and optionally enabling [`appsecret_proof`] (https://developers.facebook.com/docs/graph-api/securing-requests#appsecret_proof).

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        enableProof: false
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'facebook'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/facebook',
      passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

#### Extended Permissions

If you need extended permissions from the user, the permissions can be requested
via the `scope` option to `passport.authenticate()`.

For example, this authorization requests permission to the user's statuses and
checkins:

    app.get('/auth/facebook',
      passport.authenticate('facebook', { scope: ['user_friends', 'user_checkins'] }));

#### Re-asking for Declined Permissions

Refer to Facebook's [docs](https://developers.facebook.com/docs/facebook-login/login-flow-for-web#re-asking-declined-permissions)

    app.get('/auth/facebook',
      passport.authenticate('facebook', { authType: 'rerequest', scope: ['user_friends', 'user_checkins'] }));

#### Display Mode

The display mode with which to render the authorization dialog can be set by
specifying the `display` option.  Refer to Facebook's [OAuth Dialog](https://developers.facebook.com/docs/reference/dialogs/oauth/)
documentation for more information.

    app.get('/auth/facebook',
      passport.authenticate('facebook', { display: 'touch' }));

#### Re-authentication

Refer to Facebook's [Re-authentication](https://developers.facebook.com/docs/facebook-login/reauthentication)

    app.get('/auth/facebook',
      passport.authenticate('facebook', { authType: 'reauthenticate', authNonce: 'foo123' }));

#### Profile Fields

The Facebook profile is very rich, and may contain a lot of information.  The
strategy can be configured with a `profileFields` parameter which specifies a
list of fields (named by Portable Contacts convention) your application needs.
For example, to fetch only user's facebook ID, name, and picture, configure
strategy like this.

    passport.use(new FacebookStrategy({
        // clientID, clientSecret and callbackURL
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      // verify callback
    ));

If `profileFields` is not specified, the default fields supplied by Facebook
will be parsed.

Add `email` to _profileFields_ if you need user's email.

## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/passport/express-4.x-facebook-example)
as a starting point for their own web applications.

## Issues

Facebook's OAuth 2.0 implementation has a [bug][1] in which the fragment `#_=_`
is appended to the callback URL.  This appears to affect Firefox and Chrome, but
not Safari.  This fragment can be removed via client-side JavaScript, and [@niftylettuce](https://github.com/niftylettuce)
provides a suggested [workaround][2].  Developers are encouraged to direct their
complaints to Facebook in an effort to get them to implement a proper fix for
this issue.
[1]: https://developers.facebook.com/bugs/196125357123225
[2]: https://github.com/jaredhanson/passport-facebook/issues/12#issuecomment-5913711


## Contributing

#### Tests

The test suite is located in the `test/` directory.  All new features are
expected to have corresponding test cases.  Ensure that the complete test suite
passes by executing:

```bash
$ make test
```

#### Coverage

The test suite covers 100% of the code base.  All new feature development is
expected to maintain that level.  Coverage reports can be viewed by executing:

```bash
$ make test-cov
$ make view-cov
```

## Support

#### Funding

This software is provided to you as open source, free of charge.  The time and
effort to develop and maintain this project is dedicated by [@jaredhanson](https://github.com/jaredhanson).
If you (or your employer) benefit from this project, please consider a financial
contribution.  Your contribution helps continue the efforts that produce this
and other open source software.

Funds are accepted via [PayPal](https://paypal.me/jaredhanson), [Venmo](https://venmo.com/jaredhanson),
and [other](http://jaredhanson.net/pay) methods.  Any amount is appreciated.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2016 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
