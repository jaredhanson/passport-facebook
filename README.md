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

#### Create an Application

Before using `passport-facebook`, you must register an application with
Facebook.  If you have not already done so, a new application can be created at
[Facebook Developers](https://developers.facebook.com/).  Your application will
be issued an app ID and app secret, which need to be provided to the strategy.
You will also need to configure a redirect URI which matches the route in your
application.

#### Configure Strategy

The Facebook authentication strategy authenticates users using a Facebook
account and OAuth 2.0 tokens.  The app ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Facebook profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

```js
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'facebook'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/passport/express-4.x-facebook-example)
as a starting point for their own web applications.

## FAQ

##### How do I ask a user for additional permissions?

If you need additional permissions from the user, the permissions can be
requested via the `scope` option to `passport.authenticate()`.

```js
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));
```

Refer to [permissions with Facebook Login](https://developers.facebook.com/docs/facebook-login/permissions/overview)
for further details.

##### How do I re-ask for for declined permissions?

Set the `authType` option to `rerequest` when authenticating.

```js
app.get('/auth/facebook',
  passport.authenticate('facebook', { authType: 'rerequest', scope: ['user_friends', 'manage_pages'] }));
```

Refer to [re-asking for declined permissions](https://developers.facebook.com/docs/facebook-login/web#re-asking-declined-permissions)
for further details.

##### How do I obtain a user profile with specific fields?

The Facebook profile contains a lot of information about a user.  By default,
not all the fields in a profile are returned.  The fields need by an application
can be indicated by setting the `profileFields` option.

```js
new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}), ...)
```

Refer to the [User](https://developers.facebook.com/docs/graph-api/reference/v2.5/user)
section of the Graph API Reference for the complete set of available fields.

##### How do I include app secret proof in API requests?

Set the `enableProof` option when creating the strategy.

```js
new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  enableProof: true
}, ...)
```

As detailed in [securing graph API requests](https://developers.facebook.com/docs/graph-api/securing-requests#appsecret_proof),
requiring the app secret for server API requests helps prevent use of tokens
stolen by malicous software or man in the middle attacks.

##### Why is #\_=\_ appended to the redirect URI?

This behavior is "by design" according to Facebook's response to a [bug](https://developers.facebook.com/bugs/318390728250352)
filed regarding this issue.

Fragment identifiers are not supplied in requests made to a server, and as such
this strategy is not aware that this behavior is exhibited and is not affected
by it.  If desired, this fragment can be removed on the client side.  Refer to
this [discussion](http://stackoverflow.com/questions/7131909/facebook-callback-appends-to-return-url) on
Stack Overflow for recommendations on how to accomplish such removal.


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
