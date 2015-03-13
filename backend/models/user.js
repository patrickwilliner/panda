'use strict';

var mongoose = require('mongoose');

module.exports = function(connection) {
	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		login: String,
		firstName: String,
		lastName: String
	});

	userSchema.methods.isValidPassword = function(password) {
		return true;
	};

	var User = connection.model('User', userSchema);

	return User;
};