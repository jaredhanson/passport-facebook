# passport-facebook

[Passport](https://www.passportjs.org/) strategy for authenticating with [Facebook](https://www.facebook.com/)
using [OAuth 2.0](https://www.passportjs.org/features/oauth2/).

This module lets you authenticate using Facebook in your Node.js applications.
By plugging into Passport, Facebook Login can be easily and unobtrusively
integrated into any application or framework that supports
[Connect](https://github.com/senchalabs/connect#readme)-style middleware,
including [Express](https://expressjs.com/).

<div align="center">

:seedling: [Tutorial](https://www.passportjs.org/tutorials/facebook/?utm_source=github&utm_medium=referral&utm_campaign=passport-facebook&utm_content=nav-tutorial) •
:brain: [Understanding OAuth 2.0](https://www.passportjs.org/concepts/oauth2/?utm_source=github&utm_medium=referral&utm_campaign=passport-facebook&utm_content=nav-concept) •
:heart: [Sponsors](https://www.passportjs.org/sponsors/?utm_source=github&utm_medium=referral&utm_campaign=passport-facebook&utm_content=nav-sponsors)

</div>

<div align="right">
  <sup>Developed by <a href="#authors">Jared Hanson</a>.</sub>
</div>

---

<div align="center">
  <sup>Advertisement</sup>
  <br>
  <a href="https://click.linksynergy.com/link?id=D*o7yui4/NM&offerid=507388.922484&type=2&murl=https%3A%2F%2Fwww.udemy.com%2Fcourse%2Fthe-complete-nodejs-developer-course-2%2F&u1=1zlZ1AkoVQjosKoeCqb9osAgjkpQyUiZEQGmEc4SfB4OV">The Complete Node.js Developer Course</a><br>Learn Node. js by building real-world applications with Node, Express, MongoDB, Jest, and more!
</div>

---

## Install

    $ npm install passport-facebook

## Usage

#### Register Application

The Facebook strategy authenticates users using their Facebook account.  Before
your application can make use of Facebook's authentication system, you must
first [register](https://developers.facebook.com/docs/development/create-an-app)
your app.  Once registered, an app ID and secret will be issued which are used
by Facebook to identify your app.  You will also need to configure a redirect
URI which matches the route in your application.

#### Configure Strategy

The Facebook authentication strategy authenticates users using a Facebook
account and OAuth 2.0 tokens.  The app ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Facebook profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

```js
const FacebookStrategy = require("passport-facebook").Strategy;
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

* [todos-express-facebook](https://github.com/passport/todos-express-facebook)

  Illustrates how to use the Facebook strategy within an Express application.  For
  developers new to Passport and getting started, a [tutorial](https://www.passportjs.org/tutorials/facebook/)
  is available.

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

Set the `authType` option to `reauthenticate` when authenticating.

```js
app.get('/auth/facebook',
  passport.authenticate('facebook', { authType: 'reauthenticate', scope: ['user_friends', 'manage_pages'] }));
```

Refer to [re-asking for declined permissions](https://developers.facebook.com/docs/facebook-login/web#re-asking-declined-permissions)
for further details.

##### How do I obtain a user profile with specific fields?

The Facebook profile contains a lot of information about a user.  By default,
not all the fields in a profile are returned.  The fields needed by an application
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

## Authors

- [Jared Hanson](https://www.jaredhanson.me/) { [![WWW](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/globe-12x12.svg)](https://www.jaredhanson.me/) [![Facebook](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/facebook-12x12.svg)](https://www.facebook.com/jaredhanson) [![LinkedIn](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/linkedin-12x12.svg)](https://www.linkedin.com/in/jaredhanson) [![Twitter](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/twitter-12x12.svg)](https://twitter.com/jaredhanson) [![GitHub](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/github-12x12.svg)](https://github.com/jaredhanson) }

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2023 Jared Hanson
