'use strict';

var mongoose = require('mongoose');

module.exports = function(connection) {
	//var User = require('./user')(connection);
  var Schema = mongoose.Schema;

  var bundleSchema = new Schema({
      label: String,
      owner: String
  });

  var Bundle = connection.model('Bundle', bundleSchema);

  return Bundle;
};