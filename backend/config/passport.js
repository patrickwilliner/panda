'use strict';

var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(passport, models) {
	var User = models.user;

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
  	done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          user.passwordHash = undefined;
          user.passwordSalt = undefined;
          done(err, user);
      });
  });

  passport.use('login', new LocalStrategy(
      function(username, password, done) {
        User.findOne({login: username}, function (err, user) {
		      if (err) {
		      	return done(err);
		      } else if (!user) {
		        return done(null, false, {message: 'Incorrect credentials.'});
		      } else if (!user.isValidPassword(password)) {
		        return done(null, false, {message: 'Incorrect credentials.'});
		      } else {
		      	return done(null, user);
		      }
		    });
      }
  ));
};