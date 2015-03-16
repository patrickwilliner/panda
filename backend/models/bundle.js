'use strict';

var mongoose = require('mongoose');

module.exports = function(connection) {
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var bundleSchema = new Schema({
      label: String,
      owner: ObjectId,
      linkCount: Number,
      order: Number
  });

  var Bundle = connection.model('Bundle', bundleSchema);

  return Bundle;
};