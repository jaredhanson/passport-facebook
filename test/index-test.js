var vows = require('vows');
var assert = require('assert');
var util = require('util');
var facebook = require('..');


vows.describe('passport-facebook').addBatch({
  
  'module': {
    'should report a version': function (x) {
    },
  },
  
}).export(module);
