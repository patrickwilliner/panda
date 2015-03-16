'use strict';

var mongoose = require('mongoose');

module.exports = function(connection) {
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	var linkSchema = new Schema({
		label: String,
		url: String,
		tags: [String],
		bundle: ObjectId,
        owner: ObjectId,
		createdAt: Date,
		modifiedAt: Date
	});

	var Link = connection.model('Link', linkSchema);

	return Link;
};