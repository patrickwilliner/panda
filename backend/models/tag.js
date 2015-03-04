'use strict';

var mongoose = require('mongoose');

module.exports = function(connection) {
	var Schema = mongoose.Schema;

	var tagSchema = new Schema({
		label: String
	});

	var Tag = connection.model('Tag', tagSchema);

	return Tag;
};