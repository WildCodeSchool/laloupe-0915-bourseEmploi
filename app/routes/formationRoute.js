/* ------------------------------------------------------------------------- *\
	 						    ROUTES Formation
\* ------------------------------------------------------------------------- */

var Formation = require('../models/formation.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/formations/:studentId', Formation.findByStudent);

	app.get('/formations/:id', Formation.findById);

	app.post('/formations', Formation.create);

	app.put('/formations/:id', Formation.update);

	app.delete('/formations/:id', Formation.delete);
}