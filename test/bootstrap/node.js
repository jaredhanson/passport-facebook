var chai = require('chai')
  , passport = require('chai-passport-strategy');

chai.use(passport);


global.expect = chai.expect;
