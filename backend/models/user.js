'use strict';

var mongoose = require('mongoose');
var CryptoJS = require('crypto-js');

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

    userSchema.methods.setPassword = function(password) {
        var salt = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64);
        var hash = CryptoJS.SHA3(salt + password, { outputLength: 512 }).toString(CryptoJS.enc.Base64);

        this.passwordSalt = salt;
        this.passwordHash = hash;
    };

	userSchema.methods.isValidPassword = function(password) {
        var salt = this.passwordSalt;
		var hash = CryptoJS.SHA3(salt + password, { outputLength: 512 }).toString(CryptoJS.enc.Base64);
        return hash === this.passwordHash;
	};

	var User = connection.model('User', userSchema);

	return User;
};