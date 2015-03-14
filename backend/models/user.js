'use strict';

var mongoose = require('mongoose');

module.exports = function(connection) {
	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		login: String,
		givenName: String,
		surname: String,
		passwordHash: String,
		passwordSalt: String,
		admin: Boolean,
		active: Boolean,
		system: Boolean,
		createdAt: Date,
		modifiedAt: Date
	});

	userSchema.methods.isValidPassword = function(password) {
		return true;
	};

	var User = connection.model('User', userSchema);

	return User;
};