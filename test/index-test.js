var vows = require('vows');
var assert = require('assert');
var util = require('util');
var facebook = require('passport-facebook');


vows.describe('passport-facebook').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(facebook.version);
    },
  },
  
}).export(module);
