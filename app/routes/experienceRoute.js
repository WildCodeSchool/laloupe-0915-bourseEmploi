/* ------------------------------------------------------------------------- *\
	 						    ROUTES Expérience
\* ------------------------------------------------------------------------- */

var Experience = require('../models/experience.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/experiences/:studentId', Experience.findByStudent);

	app.get('/experiences/:id', Experience.findById);

	app.post('/experiences', Experience.create);

	app.put('/experiences/:id', Experience.update);

	app.delete('/experiences/:id', Experience.delete);
}