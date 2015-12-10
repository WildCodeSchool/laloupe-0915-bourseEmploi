/* ------------------------------------------------------------------------- *\
	 						    ROUTES Recruiters
\* ------------------------------------------------------------------------- */

var Recruiter = require('../models/recruiter.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

	app.get('/recruiters/id/:id', Auth.user.hasAuthorization, Recruiter.findById);

	app.get('/recruiters/email', Recruiter.findByEmail);

	app.get('/recruiters/:type', Auth.user.isAdministrator, Recruiter.findByType);

	app.get('/recruiters', Auth.user.isAdministrator, Recruiter.findAll);

	app.get('/recruiters/:id', Auth.user.isAdministrator, Recruiter.findById);

	app.post('/recruiters', Recruiter.create);

	app.put('/recruiters/:id', Auth.user.hasAuthorization, Recruiter.update);

	app.delete('/recruiters/:id', Auth.user.hasAuthorization, Recruiter.delete);

}

