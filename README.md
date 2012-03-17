# Passport-Facebook

[Passport](http://passportjs.org/) strategy for authenticating with [Facebook](http://www.facebook.com/)
using the OAuth 2.0 API.

This module lets you authenticate using Facebook in your Node.js applications.
By plugging into Passport, Facebook authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Installation

    $ npm install passport-facebook

## Usage

#### Configure Strategy

The Facebook authentication strategy authenticates users using a Facebook
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a app ID, app secret, and callback URL.

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
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
      passport.authenticate('facebook'),
      function(req, res){
        // The request will be redirected to Facebook for authentication, so
        // this function will not be called.
      });

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
      passport.authenticate('facebook', { scope: ['user_status', 'user_checkins'] }),
      function(req, res){
        // The request will be redirected to Facebook for authentication, with
        // extended permissions.
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/jaredhanson/passport-facebook/tree/master/examples/login).

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/passport-facebook.png)](http://travis-ci.org/jaredhanson/passport-facebook)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

(The MIT License)

Copyright (c) 2011 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
