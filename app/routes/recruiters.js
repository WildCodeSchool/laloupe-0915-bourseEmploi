/* ------------------------------------------------------------------------- *\
	 						    ROUTES Recruiters
\* ------------------------------------------------------------------------- */

var Recruiter = require('../models/recruiter.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app, passport) {

	app.get('/recruiters', Recruiter.findAll);

	app.get('/recruiters/:id', Recruiter.findById);

	app.post('/recruiters', Recruiter.create);

	app.put('/recruiters/:id', Recruiter.update);

	app.delete('/recruiters/:id', Recruiter.delete);

}





