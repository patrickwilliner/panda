'use strict';

var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(passport, models) {
    passport.use('local', new LocalStrategy(
        function(username, password, done) {
            return done(null, {'login' : 'wipa'});
        }
    ));
};