/* ------------------------------------------------------------------------- *\
	 						    ROUTES Expérience
\* ------------------------------------------------------------------------- */

var Experience = require('../models/experience.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/api/students/experiences/:id', Auth.user.hasAuthorization, Experience.findByStudent);

	app.get('/api/experiences/:id', Auth.user.hasAuthorization, Experience.findById);

	app.post('/api/experiences', Auth.user.hasAuthorization, Experience.create);

	app.put('/api/experiences/:id', Auth.user.hasAuthorization, Experience.update);

	app.delete('/api/experiences/:id', Auth.user.hasAuthorization, Experience.delete);
}