/* ------------------------------------------------------------------------- *\
	 						    DATABASE CONFIG
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://admin:azerty12345@ds059165.mongolab.com:59165/heroku_jlsj9sd4');
