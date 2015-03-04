'use strict';

module.exports = function(connection) {
	var User = require('./user')(connection);
	var Bundle = require('./bundle')(connection);
	var Link = require('./link')(connection);
	var Tag = require('./tag')(connection);

    return {
    	user: User,
    	bundle: Bundle,
    	link: Link,
    	tag: Tag
    };
};