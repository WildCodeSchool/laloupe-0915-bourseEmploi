/* ------------------------------------------------------------------------- *\
	 						    ROUTES Expérience
\* ------------------------------------------------------------------------- */

var Experience = require('../models/experience.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/experiences/:studentId', Auth.user.hasAuthorization, Experience.findByStudent);

	app.get('/experiences/:id', Auth.user.hasAuthorization, Experience.findById);

	app.post('/experiences', Auth.user.hasAuthorization, Experience.create);

	app.put('/experiences/:id', Auth.user.hasAuthorization, Experience.update);

	app.delete('/experiences/:id', Auth.user.hasAuthorization, Experience.delete);
}