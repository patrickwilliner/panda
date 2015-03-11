'use strict';

var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(passport, models) {
  passport.use(new LocalStrategy(
      function(username, password, done) {
    		console.log('login');
        return done(null, {'login' : 'wipa'});
      }
  ));
};